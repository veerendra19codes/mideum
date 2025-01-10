import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { imageUpload } from "@/actions/imageUpload";

export async function POST(req: NextRequest) {
    // const { title, content, userId } = await req.json();
    // console.log("title:", title, content, userId);
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if(file) {
        const image = await imageUpload(file);
        console.log("image: ", image);
        // console.log("res: ", res);
        if (image) {
            try {
                
                const title = formData.get("title") as string;
                const content = formData.get("content") as string;
                const userId = formData.get("userId") as string;

                console.log("file", file);


                // check if user exists
                const userExists = await prisma.mUser.findUnique({
                    where: {
                        id: Number(userId)
                    }
                })
                // console.log("userExists:", userExists);

                if (!userExists) {
                    return NextResponse.json({ message: "user with this id doen not exist" })
                }

                // post
                const newPost = await prisma.mPost.create({
                    data: {
                        title,
                        content,
                        authorId: Number(userId),
                        image,
                    },
                });
                // console.log("newPost:", newPost);

                return NextResponse.json({ message: "successfully posted", newPost, imageUpload: true })
            } catch (error) {
                console.log("error in posting:", error);
                return NextResponse.json({ message: "error in posting try again later" })
            }
        } 
        else {
            try {
                const title = formData.get("title") as string;
                const content = formData.get("content") as string;
                const userId = formData.get("userId") as string;

                console.log("file", file);


                // check if user exists
                const userExists = await prisma.mUser.findUnique({
                    where: {
                        id: Number(userId)
                    }
                })
                // console.log("userExists:", userExists);

                if (!userExists) {
                    return NextResponse.json({ message: "user with this id doen not exist" })
                }

                // post
                const newPost = await prisma.mPost.create({
                    data: {
                        title,
                        content,
                        authorId: Number(userId)
                    },
                });
                // console.log("newPost:", newPost);

                return NextResponse.json({ message: "successfully posted", newPost, imageUpload: false })
            } catch (error) {
                console.log("error in posting:", error);
                return NextResponse.json({ message: "error in posting try again later" })
            }
        }
    }
    else {
        try {
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            const userId = formData.get("userId") as string;

            console.log("file", file);


            // check if user exists
            const userExists = await prisma.mUser.findUnique({
                where: {
                    id: Number(userId)
                }
            })
            // console.log("userExists:", userExists);

            if (!userExists) {
                return NextResponse.json({ message: "user with this id doen not exist" })
            }

            // post
            const newPost = await prisma.mPost.create({
                data: {
                    title,
                    content,
                    authorId: Number(userId)
                },
            });
            // console.log("newPost:", newPost);

            return NextResponse.json({ message: "successfully posted", newPost, imageUpload: false })
        } catch (error) {
            console.log("error in posting:", error);
            return NextResponse.json({ message: "error in posting try again later" })
        }
    }     
}