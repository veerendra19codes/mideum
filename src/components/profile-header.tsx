'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings, Link, PlusCircle, FolderPlus } from 'lucide-react'
import { EditProfileDialog } from '@/components/edit-profile-dialog'

interface UserProps {
    name?: string,
    username?: string,
    bio?: string,
}

export function ProfileHeader({ user }: { user: UserProps }) {
    // Safe defaults for user properties
    const name = user?.name || "No name";
    const username = user?.username || "Unknown User";
    const bio = user?.bio || "No bio available.";

    return (
        <header className="bg-background border-b w-full">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarFallback>{username[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{name}</h1>
                            <p className="text-muted-foreground">{username}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <Link className="mr-2 h-4 w-4" />
                                Copy profile link
                            </DropdownMenuItem>

                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <EditProfileDialog user={user} />
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add a new post
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FolderPlus className="mr-2 h-4 w-4" />
                                Create a new collection
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="mt-4 max-w-2xl">{bio}</p>
            </div>
        </header>
    )
}

