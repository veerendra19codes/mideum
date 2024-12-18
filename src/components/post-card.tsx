'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Heart, Bookmark, Share2, MoreHorizontal, FolderPlus } from 'lucide-react'
import { formatDistance } from "date-fns";

interface PostsProps {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    content: string,
    image: string,
    published: boolean,
    author?: {
        authorId?: string,
        username?: string,
    }
}

export function PostCard({ post }: { post: PostsProps }) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    // function formatDateToDDMMYYYY(dateString: string): string {
    //     // Parse the ISO string into a Date object
    //     const date = new Date(dateString);

    //     // Extract day, month, and year
    //     const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //     const year = date.getFullYear();

    //     // Return formatted date
    //     return `${day}-${month}-${year}`;
    // }

    return (
        <div className="flex border rounded-lg overflow-hidden">
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarFallback>{"U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post?.author?.username || "username"}</p>
                            <p className="text-sm text-muted-foreground">
                                {formatDistance(post?.createdAt, new Date(), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <FolderPlus className="mr-2 h-4 w-4" />
                                Add to collection
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? 'text-red-500' : ''}
                    >
                        <Heart className="mr-2 h-4 w-4" />
                        Like
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={isBookmarked ? 'text-blue-500' : ''}
                    >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>
        </div>
    )
}

