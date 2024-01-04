"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface IBackButton {
    href: string
    label: string
}

export const BackButton = ({ href, label }: IBackButton) => {
    return (
        <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
            <Link href={href}>{label}</Link>
        </Button>
    );
};