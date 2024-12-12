import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const filters = await req.json();
        console.log("filters:", filters);

        const { author, title, tags, dateFrom, dateTo, sortBy } = filters;

        // Construct the query dynamically based on filters
        const query: any = {
            where: {},
            orderBy: [],
        };

        // Apply author filter
        if (author) {
            query.where.author = {
                name: {
                    contains: author,
                    mode: "insensitive",
                },
            };
        }

        // Apply title filter
        if (title) {
            query.where.title = {
                contains: title,
                mode: "insensitive",
            };
        }

        // Apply tags filter
        if (tags && tags.length > 0) {
            query.where.tags = {
                hasSome: tags.split(",").map((tag: string) => tag.trim()),
            };
        }

        // Apply date range filter
        if (dateFrom) {
            query.where.createdAt = {
                ...query.where.createdAt,
                gte: new Date(dateFrom),
            };
        }

        if (dateTo) {
            query.where.createdAt = {
                ...query.where.createdAt,
                lte: new Date(dateTo),
            };
        }

        // Apply sorting filter
        if (sortBy) {
            const [field, direction] = sortBy.split("-");
            if (field && direction) {
                query.orderBy.push({
                    [field === "bookmarks" ? "bookmars" : field]:
                        direction === "high" ? "desc" : "asc",
                });
            }
        } else {
            query.orderBy.push({ createdAt: "desc" }); // Default sort by createdAt descending
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
                bookmars: true,
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
