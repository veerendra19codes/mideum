import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        username: string;
        email: string | null;
    }
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                try {
                    const user = await prisma.mUser.findFirst({
                        where: { email: credentials.email },
                    });

                    if (!user) {
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        return null;
                    }

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        username: user.username,
                    };
                } catch (err) {
                    console.error("Error in authorize:", err);
                    throw new Error("Error during login");
                }
            },
        }),
    ],

    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    email: token.email,
                },
            };
        },

        async jwt({ token, user }: { token: JWT; user?: { id: string; username?: string; email?: string | null } }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username || "",
                    email: user.email || null,
                };
            }
            return token;
        },
    },
};
