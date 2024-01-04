"use client";

import { useCallback, useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { NewVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";

export const NewVereficationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing token");
            return;
        }

        NewVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wron!");
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && <FormError message={error} />}
                <FormSuccess message={success} />
                {!success && !error && <BeatLoader />}
            </div>
        </CardWrapper>
    );
};
