"use client";

import { MouseEvent, useEffect, useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react'
import { FaHeart, FaBookmark } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
// import { formatDateToDDMMYYYY } from '@/lib/helperFunctions';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import { useUserContext } from '@/contexts/userContext';
import { PostType } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { getValidImageUrl } from '@/lib/helperFunctions';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function BlogCard({ blog }: { blog: PostType }) {
    const { user } = useUserContext();

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarksCount, setBookmarksCount] = useState<number | undefined>(blog.bookmarks?.length || 0);
    const [likesCount, setLikesCount] = useState<number | undefined>(blog.likes?.length || 0);
    const [commentsCount] = useState<number | undefined>(blog.comments?.length || 0);
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            if (blog.likes != undefined) {
                setIsLiked(() => {
                    return blog.likes.some((like) => like?.userId === Number(user.id));
                })
            }
            if (blog.bookmarks != undefined) {
                setIsBookmarked(() => {
                    return blog.bookmarks.some((bookmark) => bookmark.userId === Number(user.id));
                })
            }
        }

    }, [user, blog.likes, blog.bookmarks])
    // console.log("publishDate:", createdAt);

    const handleLike = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put("/api/posts/like", {
                postId: blog.id, // ID of the post being liked
                userId: user?.id || 0, // Replace with the actual user ID (fetch it from your auth system)
            });

            if (res.data.liked && res.data.status == 200) {
                setIsLiked(true);
                if (likesCount) {
                    setLikesCount(likesCount + 1);
                }
                else {
                    setLikesCount(1);
                }
                // Optionally, increment the likes count in the UI
            }
            else if (!res.data.liked && res.data.status == 200) {
                setIsLiked(false);
                if (likesCount) {
                    setLikesCount(likesCount - 1);
                }
                else {
                    setLikesCount(0);
                }
                // Optionally, increment the likes count in the UI
            } else {
                setIsLiked(false);
                // Optionally, decrement the likes count in the UI
            }
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    const handleBookmark = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put("/api/posts/bookmark", {
                postId: blog.id, // ID of the post being liked
                userId: user?.id || 0, // Replace with the actual user ID (fetch it from your auth system)
            });

            if (res.data.bookmark && res.data.status == 200) {
                setIsBookmarked(true);
                if (bookmarksCount) {
                    setBookmarksCount(bookmarksCount + 1);
                }
                else {
                    setBookmarksCount(1);
                }
                // Optionally, increment the likes count in the UI
            }
            else if (!res.data.bookmark && res.data.status == 200) {
                setIsBookmarked(false);
                if (bookmarksCount) {
                    setBookmarksCount(bookmarksCount - 1);
                }
                else {
                    setBookmarksCount(0);
                }
                // Optionally, increment the likes count in the UI
            } else {
                setIsBookmarked(false);
                // Optionally, decrement the likes count in the UI
            }
        } catch (error) {
            console.error("Error Bookmarking the post:", error);
        }
    };

    if (blog.title) return (
        <Link href={`/p/${blog.id}`}>

            <Card className="mb-6" style={{ direction: 'ltr' }}>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Avatar>
                    <AvatarImage src={blog.author?.image} alt={blog.author?.name} />
                    <AvatarFallback>{"U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        {blog.author && blog.author.name && <h2 className="text-lg font-semibold">{blog.author?.name != null ? blog.author.name : "blog user"}</h2>}
                        <p className="text-sm text-muted-foreground">{formatDistance(blog.createdAt || new Date(), new Date(), {
                            addSuffix: true,
                        })}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-start">
                        <div className="flex flex-col justify-start items-start w-4/5">
                            <h3 className="text-2xl font-bold">{blog.title}</h3>
                            <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags && blog.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        
                        <div className="w-1/5 relative flex-wrap text-ellipsis p-2 overflow-hidden size-[150px]">
                        {!imageError && (
                                <Image
                                    src={getValidImageUrl(blog.image)}
                                    alt={blog.title || 'Blog post image'}
                                    fill
                                    
                                    className="rounded-lg size-60 object-cover"
                                    priority={false}
                                    onError={() => setImageError(true)}
                                />
                            )}
                        </div>
                    </div>
                    
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap">
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike} className="z-10"
                        >
                            {isLiked ? <FaHeart className="mr-2 h-4 w-4 text-red-500" />
                                :
                                <Heart className="mr-2 h-4 w-4" />
                            }
                            {likesCount || 0}
                        </Button>
                        <Button variant="ghost" size="sm">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {commentsCount}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBookmark}
                        >
                            {isBookmarked ? <FaBookmark className="mr-2 h-4 w-4 text-blue-500" /> :
                                <Bookmark className="mr-2 h-4 w-4" />
                            }
                            {blog.bookmarks?.length || 0}
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        {/* <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                    </Button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem><Share2 className="h-4 w-4" /> Share</DropdownMenuItem>

                                <DropdownMenuItem>Add to collection</DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )

    else return <></>;
}

