import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId, comment, postId } = await req.json();
        console.log("userId: ", userId, comment, postId);

        const newComment = await prisma.mComments.create({
            data: {
                userId, comment, postId,
            }
        })

        return NextResponse.json({ message: "comment added successfully", status: 200, newComment });
    } catch (error) {
        console.log("error in commenting: ", error);
        return NextResponse.json({ message: "error in commenting", status: 403 })
    }
}