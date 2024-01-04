"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validetedFields = ResetSchema.safeParse(values);

    if (!validetedFields.success) {
        return {
            error: "Invalid email!",
        };
    }

    const { email } = validetedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "Email not found!",
        };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return {
        success: "Reset email sent!",
    };
};
