import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ postId: string }> }) {
    try {
        const { postId } = await context.params;

        const comments = await prisma.mComments.findMany({
            where: {
                postId: Number(postId)
            },
            select: {
                user: {
                    select: {
                        username: true,
                        image: true,
                    }
                },
                comment: true,
                id: true,
                postId: true,
            }
        })

        return NextResponse.json({ message: "comments fetched successfully", comments, status: 200 });
    } catch (error) {
        console.log("error in getting comments: ", error);
        return NextResponse.json({ message: "failed to fetch comments", status: 403 });

    }
}