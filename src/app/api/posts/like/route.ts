import { prisma } from "@/lib/db"; // Ensure you have Prisma set up properly
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    const { postId, userId } = await req.json();

    if (!postId || !userId) {
        return NextResponse.json({ error: "Post ID and User ID are required", status: 200 });
    }

    try {
        // Check if the user already liked the post
        const existingLike = await prisma.mLikes.findFirst({
            where: { postId, userId },
        });

        if (existingLike) {
            // If the like exists, remove it (toggle off)
            await prisma.mLikes.delete({ where: { id: existingLike.id } });
            return NextResponse.json({ message: "Like removed", liked: false, status: 200 });
        }

        // Otherwise, create a new like (toggle on)
        await prisma.mLikes.create({
            data: {
                postId,
                userId,
            },
        });
        return NextResponse.json({ message: "Like added", liked: true, status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong", status: 500 });
    }


}
