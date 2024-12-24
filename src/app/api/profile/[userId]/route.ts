import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.pathname.split("/").pop();
        // console.log("userId:", userId);

        // Ensure userId is a number
        if (!userId || isNaN(Number(userId))) {
            return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
        }


        const id = Number(userId)

        const user = await prisma.mUser.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                image: true,
                posts: {
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
                                username: true,
                                email: true,
                                name: true,
                                image: true,
                            }
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
                    orderBy: {
                        createdAt: "desc",
                    }
                },

            },

        })
        // console.log("user:", user);

        if (!user) {
            return NextResponse.json({ message: "User not found" })

        }

        return NextResponse.json({ message: "User details fetched", user })
    } catch (error) {
        console.log("error in getting userdetails:", error);
        return NextResponse.json({ message: "error in getting user details, try again later" })
    }
}