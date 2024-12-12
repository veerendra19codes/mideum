"use client";

import { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatDateToDDMMYYYY } from '@/lib/helperFunctions';

interface BlogCardProps {
    author?: {
        name: string
        avatar: string
    }
    title?: string
    content?: string
    tags?: string[]
    createdAt?: string
    likes?: number
    comments?: number
    bookmarks?: number
}

export function BlogCard({
    author,
    title,
    content,
    tags,
    createdAt,
    likes,
    comments,
    bookmarks,
}: BlogCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    // console.log("publishDate:", createdAt);


    if (title) return (
        <Card className="mb-6" style={{ direction: 'ltr' }}>
            <CardHeader className="flex flex-row items-center gap-2">
                {/* <Avatar>
                    <AvatarImage src={author?.avatar} alt={author?.name} />
                    <AvatarFallback>{author?.name[0] || "U"}</AvatarFallback>
                </Avatar> */}
                <div>
                    {author && author.name && <h2 className="text-lg font-semibold">{author?.name}</h2>}
                    <p className="text-sm text-muted-foreground">{formatDateToDDMMYYYY(createdAt || "")}</p>
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-muted-foreground line-clamp-3">{content}</p>
                <div className="flex flex-wrap gap-2">
                    {tags && tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? "text-red-500" : ""}
                    >
                        <Heart className="mr-2 h-4 w-4" />
                        {likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {comments}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={isBookmarked ? "text-blue-500" : ""}
                    >
                        <Bookmark className="mr-2 h-4 w-4" />
                        {bookmarks}
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Add to collection</DropdownMenuItem>
                            <DropdownMenuItem>Report</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    )

    else return <></>;
}

