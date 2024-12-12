"use client";

import { ProfileHeader } from '@/components/profile-header'
import { ProfileNavbar } from '@/components/porfile-navbar'
import { PostList } from '@/components/post-list'
import { useUserContext } from '@/contexts/userContext';


export default function ProfilePage() {

    const { user } = useUserContext();

    return (
        <div className="min-h-screen bg-background px-4 md:px-12">
            {user && <ProfileHeader user={user || {}} />}
            <main className="container mx-auto px-4 py-8">
                <ProfileNavbar />
                <PostList user={user || {}} />
            </main>
        </div>
    )
}

