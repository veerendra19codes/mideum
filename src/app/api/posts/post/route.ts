import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        const { title, content, userId } = await req.json();
        console.log("title:", title, content, userId);

        // check if user exists
        const userExists = await prisma.mUser.findUnique({
            where: {
                id: userId
            }
        })
        console.log("userExists:", userExists);

        if (!userExists) {
            return NextResponse.json({ message: "user with this id doen not exist" })
        }

        // post
        const newPost = await prisma.mPost.create({
            data: {
                title,
                content,
                authorId: userId
            },
        });
        console.log("newPost:", newPost);

        return NextResponse.json({ message: "successfully posted", newPost })
    } catch (error) {
        console.log("error in posting:", error);
        return NextResponse.json({ message: "error in posting try again later" })
    }
}