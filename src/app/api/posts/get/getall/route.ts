import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const filters = await req.json();
        console.log("filters:", filters);

        const { author, title, tags, dateFrom, dateTo, sortBy } = filters;

        // Construct the query dynamically based on filters
        const query: Prisma.MPostFindManyArgs = {
            where: {},
            orderBy: [],
        };

        // Apply author filter
        if (author) {
            query.where = query.where || {};
            query.where.author = {
                name: {
                    contains: author,
                    mode: "insensitive",
                },
            };
        }

        // Apply title filter
        if (title) {
            query.where = query.where || {};
            query.where.title = {
                contains: title,
                mode: "insensitive",
            };
        }

        // Apply tags filter
        if (tags && tags.length > 0) {
            query.where = query.where || {};
            query.where.tags = {
                hasSome: tags.split(",").map((tag: string) => tag.trim()),
            };
        }

        // Apply date filters
        if (dateFrom || dateTo) {
            query.where = query.where || {};
            query.where.createdAt = {};

            if (dateFrom) {
                query.where.createdAt.gte = new Date(dateFrom);
            }

            if (dateTo) {
                query.where.createdAt.lte = new Date(dateTo);
            }
        }

        // Apply sorting filter
        if (sortBy) {
            const [field, direction] = sortBy.split("-");
            if (field && direction) {
                query.orderBy = [{
                    [field === "bookmarks" ? "bookmarks" : field]:
                        direction === "high" ? "desc" : "asc",
                }];
            }
        } else {
            query.orderBy = [{ createdAt: "desc" }]; // Default sort by createdAt descending
        }

        // Fetch filtered posts
        const posts = await prisma.mPost.findMany({
            ...query,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                likes: true,
                bookmarks: true,
            },
        });

        console.log("posts:", posts);
        return NextResponse.json({
            message: "Successfully fetched posts",
            posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({
            message: "Error fetching posts. Please try again later.",
        }, { status: 500 });
    }
}