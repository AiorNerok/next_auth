"use client";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";

import { Button } from "../ui/button";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Input } from "../ui/input";
import { NewPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export const NewPasswordForm = () => {
    const [isPending, startTrnsition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const serchParams = useSearchParams();
    const tokent = serchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = ({ password }: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTrnsition(() => {
            NewPassword({ password }, tokent).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Enter new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
