'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ProfileNavbar() {
    const [activeTab, setActiveTab] = useState('posts')

    return (
        <nav className="flex space-x-1 border-b mb-8">
            <Button
                variant={activeTab === 'posts' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('posts')}
            >
                My Posts
            </Button>
            <Button
                variant={activeTab === 'bookmarks' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('bookmarks')}
            >
                Bookmarks
            </Button>
            {/* <Button
                variant={activeTab === 'collections' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('collections')}
            >
                Collections
            </Button> */}
        </nav>
    )
}

