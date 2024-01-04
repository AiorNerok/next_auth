"use client";

import { PropsWithChildren } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface ICardWrapper extends PropsWithChildren {
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel, showSocial }: ICardWrapper) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
};