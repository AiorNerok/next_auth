"use server";

import * as z from "zod";

import { SettingsSchema } from "@/schemas";
import bcryptjs from "bcryptjs";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserById } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }
    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserById(values.email);

        if (existingUser) {
            return {
                error: "Email already in use!",
            };
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail({
            email: verificationToken.email,
            token: verificationToken.token,
        });
        return {
            success: "Verification email sent!",
        };
    }

    const dbUser = await getUserById(user.id);

    if (values.password && values.newPassword && dbUser?.password) {
        const passwordsMatch = await bcryptjs.compare(
            values.password,
            dbUser.password
        );

        if (!passwordsMatch) {
            return {
                error: "Incorrenct password!",
            };
        }

        const hashPassword = await bcryptjs.hash(values.newPassword, 17);

        values.password = hashPassword;
        values.newPassword = undefined;
    }

    if (!dbUser) {
        return {
            error: "Unauthorized",
        };
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: { ...values },
    });

    return {
        success: "Settings updated!",
    };
};
