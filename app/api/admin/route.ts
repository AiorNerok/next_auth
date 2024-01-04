import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

export async function GET() {
    const role = await useCurrentRole();

    if (role === UserRole.ADMIN) {
        return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 403 });
}
