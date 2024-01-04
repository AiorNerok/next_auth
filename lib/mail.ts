import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const Link_ = "http://localhost:3000/auth";

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${Link_}/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a></p>`,
    });
};

export const sendVerificationEmail = async ({
    email,
    token,
}: {
    email: string;
    token: string;
}) => {
    const confirmLink = `${Link_}/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a></p>`,
    });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA code",
        html: `<p>You 2FA code: ${token}</p>`,
    });
};
