"use client";

import { PropsWithChildren } from "react";
import { logout } from "@/actions/logout";

export const LogoutButton = ({ children }: PropsWithChildren) => {
    const Onclick = () => logout();

    return (
        <span className="cursor-pointer" onClick={Onclick}>
            {children}
        </span>
    );
};
