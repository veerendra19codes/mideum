'use client'

import { Button } from '@/components/ui/button'

export function ProfileNavbar({activeTab, setActiveTab}: {activeTab:string, setActiveTab: (value: string) => void}) {

    return (
        <nav className="flex space-x-1 border-b mb-4">
            <Button
                variant={activeTab === 'posts' ? 'default' : 'ghost'}
                onClick={() => setActiveTab("")}
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

