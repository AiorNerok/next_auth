import { db } from "@/lib/db";
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const vereficationToken = await db.verificationToken.findFirst({
            where: { email },
        });

        return vereficationToken;
    } catch {
        return null;
    }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const vereficationToken = await db.verificationToken.findFirst({
            where: { token },
        });
        return vereficationToken;
    } catch {
        return null;
    }
};
