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
                username: true,
                name: true,
                email: true,
                bio: true,
                image: true,
                posts: {
                    select: {
                        author: {
                            select: {
                                username: true,
                                id: true,
                            }
                        },
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        published: true,
                        authorId: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    }
                }
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