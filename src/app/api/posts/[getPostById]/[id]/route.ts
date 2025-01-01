import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const post = await prisma.mPost.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                title: true,
                content: true,
                image: true,
                tags: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        image: true,
                    },
                },
                likes: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    }
                },
                bookmarks: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    }
                }
            },
        });

        console.log("single post:", post);

        return NextResponse.json({
            message: "successfully fetched single post",
            post,
        });
    } catch (error) {
        console.error("error in getting single post:", error);
        return NextResponse.json({
            message: "error in getting single post, try again later",
        });
    }
}
