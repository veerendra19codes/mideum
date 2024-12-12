import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        console.log("session:", session);

        const id = session?.user?.id || "";
        const { name, bio, image } = await req.json();
        console.log("req.body:", name, bio, image);

        // upsert means it will create new entry if not present
        const updatedProfile = await prisma.mUser.update({
            where: { id: Number(id) },
            data: { name, bio, image },
            select: {
                email: true,
                name: true,
                username: true,
                bio: true,
                image: true
            }
        });

        return NextResponse.json({ message: "Successfully edited profile", updatedProfile })
    } catch (error) {
        console.log("error in updating profile details: ", error);
        // return NextResponse.json({ message: "Something went wrong while updating profile" })
    }
}