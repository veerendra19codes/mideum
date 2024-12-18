// import { connectToDB } from "@/lib/db";
// import User from "@/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        // await connectToDB();

        const { username, email, password } = await req.json();
        // console.log("new franchise:", { username, password, email });

        // const exists = await User.findOne({ username });
        const exists = await prisma.mUser.findFirst({
            where: {
                username: username,
            }
        })

        if (exists) {
            return NextResponse.json({ message: "Username or Email already exists" }, { status: 500 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.mUser.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        // console.log("newUser:", newUser);

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    }
    catch (err) {
        console.log("Error while registering user in route.js", err);

        return NextResponse.json({ message: "Error in registered user in route.js" }, { status: 501 });
    }
}