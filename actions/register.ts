"use server";

import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const { email, name, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser)
        return {
            error: "Email already in use!",
        };

    const hashPassword = await bcrypt.hash(password, 17);

    await db.user.create({
        data: {
            email,
            name,
            password: hashPassword,
        },
    });

    const vereficationToken = await generateVerificationToken(email);

    await sendVerificationEmail({
        email: vereficationToken.email,
        token: vereficationToken.token,
    });

    return {
        success: "Confirmation email sent!",
    };
};
