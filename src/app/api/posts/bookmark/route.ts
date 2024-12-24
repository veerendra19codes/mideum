import { prisma } from "@/lib/db"; // Ensure you have Prisma set up properly
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    const { postId, userId } = await req.json();

    if (!postId || !userId) {
        return NextResponse.json({ error: "Post ID and User ID are required", status: 200 });
    }

    try {
        // Check if the user already liked the post
        const existingBookmark = await prisma.mBookmarks.findFirst({
            where: { postId, userId },
        });

        if (existingBookmark) {
            // If the like exists, remove it (toggle off)
            await prisma.mBookmarks.delete({ where: { id: existingBookmark.id } });
            return NextResponse.json({ message: "Bookmark removed", bookmark: false, status: 200 });
        }

        // Otherwise, create a new like (toggle on)
        await prisma.mBookmarks.create({
            data: {
                postId,
                userId,
            },
        });
        return NextResponse.json({ message: "Bookmark added", bookmark: true, status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong", status: 500 });
    }


}
