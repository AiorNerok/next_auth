"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { admin } from "@/actions/admin";
import { toast } from "sonner";

export default function AdminPage() {
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.error) toast.error(data.error);
            if (data.success) toast.success(data.success);
        });
    };
    const onApiRouteClick = () => {
        fetch("/api/admin").then((r) => {
            if (r.ok) {
                console.log("ok");
                toast.success("Allowed api route");
            } else {
                console.error("FORBIDDEN");
                toast.error("FORBIDDEN");
            }
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🔑 Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowdRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p>Admin only api route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p>Admin only server action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
}
