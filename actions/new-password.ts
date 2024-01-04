"use server";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/reset";
import { getUserByEmail } from "@/data/user";

export const NewPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return {
            error: "Missing token!",
        };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Invalied token!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token has expired!",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "Email does not exist!",
        };
    }

    const hashedPassword = await bcryptjs.hash(password, 17);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return {
        success: "New password has been successfully set",
    };
};
