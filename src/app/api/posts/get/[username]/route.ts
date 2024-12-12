import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    const { userId } = await context.params;

    try {
        const posts = await prisma.mPost.findMany({
            where: {
                authorId: Number(userId),
            },
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log("myposts:", posts);

        return NextResponse.json({
            message: "successfully fetched all posts",
            posts,
        });
    } catch (error) {
        console.error("error in getting all posts:", error);
        return NextResponse.json({
            message: "error in getting posts, try again later",
        });
    }
}
