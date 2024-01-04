import crypto from "crypto";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "../data/reset";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "../data/verefication-token";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const vereficationToken = await db.verificationToken.create({
        data: {
            email,
            expires,
            token,
        },
    });

    return vereficationToken;
};

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 100_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return twoFactorToken
};
