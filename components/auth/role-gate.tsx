"use client";

import { FormError } from "../form-error";
import { PropsWithChildren } from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

interface IRoleGate extends PropsWithChildren {
    allowdRole: UserRole;
}

export const RoleGate = ({ allowdRole, children }: IRoleGate) => {
    const role = useCurrentRole();

    if (role !== allowdRole) {
        return (
            <FormError message="You do not have permission to view this content!" />
        );
    }

    return <>{children}</>;
};
