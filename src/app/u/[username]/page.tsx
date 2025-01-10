"use client";

import { ProfileHeader } from '@/components/profile-header'
import { ProfileNavbar } from '@/components/porfile-navbar'
import { PostList } from '@/components/post-list'
import { useUserContext } from '@/contexts/userContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostType } from '@/types';


export default function ProfilePage() {

    const { user } = useUserContext();
    const [activeTab, setActiveTab] = useState('posts')
    const [userPosts, setUserPosts] = useState<PostType[]>([]);
    const [bookmarkedPosts, setBookmarkedPost]  = useState<PostType[]>([]);

    useEffect(() => {
        const fetchPosts = async() => {
            const posts = await axios.get(`/api/posts/get/${user?.id}`);
            console.log("posts:",posts);
            setUserPosts(posts.data.posts);
            setBookmarkedPost(posts.data.posts);
        }
        fetchPosts();
    },[user?.id])

    return (
        <div className="min-h-screen bg-background px-4 md:px-12">
            {user && <ProfileHeader user={user || {}} />}
            <main className="container mx-auto md:px-4 py-8">
                <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
                <PostList activeTab={activeTab} userPosts={userPosts} bookmarkedPosts={bookmarkedPosts} />
            </main>
        </div>
    )
}

