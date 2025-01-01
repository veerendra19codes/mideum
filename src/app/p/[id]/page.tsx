"use client";

import { Button } from '@/components/ui/button';
import { useUserContext } from '@/contexts/userContext';
import { PostType } from '@/types';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { useParams } from 'next/navigation'
import React, { MouseEvent, useEffect, useState } from 'react'
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import { FaHeart, FaBookmark } from "react-icons/fa";
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

function Post() {
    const params = useParams();
    // console.log("params: ", params); // { id: "10"}
    const { user } = useUserContext();

    const [post, setPost] = useState<PostType>({
        id: Number(params.id),
        createdAt: "", // ISO string for date
        updatedAt: "", // ISO string for date
        title: "",
        content: "",
        image: "",
        tags: [],
        published: true,
        author: {
            id: 0,
            email: "",
            username: "",
        },
        likes: [],
        bookmarks: [],
        comments: []

    });
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarksCount, setBookmarksCount] = useState<number | undefined>(post.bookmarks?.length || 0);
    const [likesCount, setLikesCount] = useState<number | undefined>(post.likes?.length || 0);
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<{ postId: number, id: number, comment: string, userId: number, user: { username: string, image: string } }[]>([]);

    useEffect(() => {
        const findPost = async () => {
            const res = await axios.get(`/api/posts/getPostById/${params.id}`);
            // console.log("res:", res); // res.data.post
            setPost(res.data.post);
        }


        if (params.id) {
            findPost();
        }

    }, [params.id])

    useEffect(() => {
        const findComments = async () => {
            const res = await axios.get(`/api/getCommentsByPostId/${post.id}`)

            // console.log("comments: ", res);
            setComments(res.data.comments);
        }
        if (post.id > 0) {
            findComments();
        }
    }, [post])

    const handleLike = async (e: MouseEvent) => {
        e.preventDefault();
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

    const handleBookmark = async (e: MouseEvent) => {
        e.preventDefault();
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

    const handleComment = async (e: MouseEvent) => {
        e.preventDefault();

        try {
            // console.log(user?.id, comment, post.id);
            const res = await axios.post(`/api/comment`, {
                userId: user?.id,
                comment,
                postId: post.id
            }
            )
            // console.log("res: ", res);
            const newComment = { ...res.data.newComment, user };
            setComments(prev => [...prev, newComment]);
            setComment("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later"
            })
            console.log("error in commenting: ", error);
        }
    }

    const shareLink = `${window.location.origin}/p/${params.id}`;

    return (
        <div className="w-full min-h-screen flex justify-center p-4">
            {post.title ?
                <div className="md:w-1/3 flex flex-col gap-2 justify-start items-start">
                    <h1 className="font-black text-3xl">{post.title}</h1>

                    <div className="flex justify-between w-full items-center">
                        <p>by <span className="text-xl">{post.author.name}</span></p>
                        <p className="text-gray-500">{formatDistance(post.createdAt || new Date(), new Date(), {
                            addSuffix: true,
                        })}</p>
                    </div>

                    <Separator />

                    <div className="w-full justify-between flex gap-4">
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
                            {/* {post.comments.length || 0}
                         */}
                            0
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBookmark}
                        >
                            {isBookmarked ? <FaBookmark className="mr-2 h-4 w-4 text-blue-500" /> :
                                <Bookmark className="mr-2 h-4 w-4" />
                            }
                            {post.bookmarks?.length || 0}
                        </Button>

                        <Button variant="ghost" size="sm" onClick={() => {
                            navigator.clipboard.writeText(shareLink);
                            toast({
                                title: "Link copied to clipboard",
                                description: "Post linked copied to the clipboard",
                            })
                        }}>
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator />

                    <p className="mt-4 mb-4">{post.content}</p>

                    <Separator />

                    <div className="w-full comments flex flex-col gap-4 justify-center items-center">
                        <h1 className="text-xl font-black">Comments</h1>
                        <div className="flex gap-4 w-full ">
                            <Input value={comment} onChange={(e) => setComment(e.target.value)} className="w-4/5" placeholder="your comment..." />
                            <Button className="bg-blue-500 hover:bg-blue-400 w-1/5 text-white hover:text-white" variant={"ghost"} onClick={handleComment} >Add</Button>
                        </div>

                        <div className="w-full max-h-[200px] overflow-y-auto border p-2 border-gray-500 rounded flex flex-col gap-2">
                            {comments.length > 0 && [...comments].reverse().map((comment) => {
                                return (
                                    <div key={comment?.id} className="comment w-full">
                                        <p className="text-gray-700">{comment?.user?.username}</p>
                                        <p>{comment?.comment}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div> :
                <>
                    <p>loading</p>
                </>}
        </div>
    )
}

export default Post
