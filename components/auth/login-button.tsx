"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

interface ILoginButton extends PropsWithChildren {
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export const LoginButton = ({ asChild, children, mode = "modal" }: ILoginButton) => {
    const router = useRouter();

    const OnClick = () => router.push("/auth/login");


    if (mode == "redirect") {
        return (
            <span>
                TODO: Implement modal
            </span>
        );
    }

    return (
        <span className="cursor-pointer" onClick={OnClick}>
            {children}
        </span>
    );
};