'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Heart, Bookmark, Share2, MoreHorizontal, FolderPlus } from 'lucide-react'
import { formatDistance } from "date-fns";
import { PostType } from '@/types'
import { useUserContext } from '@/contexts/userContext'
import axios from 'axios'
import { FaBookmark, FaHeart } from 'react-icons/fa'
import Image from 'next/image'
import { getValidImageUrl } from '@/lib/helperFunctions'

export function PostCard({ post }: { post: PostType }) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarksCount, setBookmarksCount] = useState<number | undefined>(post.bookmarks?.length || 0);
    const [likesCount, setLikesCount] = useState<number | undefined>(post.likes?.length || 0);
    const { user } = useUserContext();
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        if (post && user) {
            setIsLiked(() => {
                return post.likes.some((like) => like.userId == user.id)
            })
            setIsBookmarked(() => {
                return post.bookmarks.some((bookmark) => bookmark.userId == user.id)
            })
        }
    }, [post, user])

    const handleLike = async () => {
        try {
            const res = await axios.put("/api/posts/like", {
                postId: post.id, // ID of the post being liked
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

    const handleBookmark = async () => {
        try {
            const res = await axios.put("/api/posts/bookmark", {
                postId: post.id, // ID of the post being liked
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

    return (
        <div className="flex border rounded-lg overflow-hidden">
            <div className="flex-1 p-2 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage src={post.author.image} alt={post.author.name} />
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

                <div className="flex justify-center items-start">
                    <div className="flex flex-col justify-start items-start w-4/5">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                    </div>

                    <div className="w-1/5 relative flex-wrap text-ellipsis p-2 overflow-hidden size-[150px]">
                        {!imageError && (
                                <Image
                                    src={getValidImageUrl(post.image)}
                                    alt={post.title || 'Blog post image'}
                                    fill
                                    
                                    className="rounded-lg size-60 object-cover"
                                    priority={false}
                                    onError={() => setImageError(true)}
                                />
                            )}
                        </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={isLiked ? 'text-red-500' : ''}
                    >
                        {isLiked ? <FaHeart className="mr-2 h-4 w-4 text-red-500" />
                            :
                            <Heart className="mr-2 h-4 w-4" />
                        }
                        {post.likes.length || 0}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBookmark}
                        className={isBookmarked ? 'text-blue-500' : ''}
                    >
                        {isBookmarked ? <FaBookmark className="mr-2 h-4 w-4 text-blue-500" /> :
                            <Bookmark className="mr-2 h-4 w-4" />
                        }
                        {post.bookmarks.length || 0}
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

