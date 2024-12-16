'use client'

import Link from 'next/link'
import { BellIcon, Bookmark, Globe, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { WriteBlogDialog } from '@/components/write-blog-dialog'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from "next-auth/react";
import { ModeToggle } from './theme-toggler'
import { useUserContext } from '@/contexts/userContext'

export default function Navbar() {

    const pathname = usePathname();
    // console.log("pathname:", pathname);
    const router = useRouter();
    const { user } = useUserContext();

    if (pathname == "/login" || pathname == "/register") return null;

    else return (
        <nav className="border-b">
            <div className="flex items-center justify-between p-3 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex  items-center flex-shrink-0 flex-row font-black text-2xl">
                    Mideum
                </Link>

                {user?.username ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar>
                                    <AvatarFallback>{user?.username[0].toUpperCase() || "U"}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem className="py-3 cursor-pointer" onClick={() => router.push(`/u/${user?.username}`)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <WriteBlogDialog />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3 cursor-pointer" onClick={() => router.push(`/explore`)}>
                                <Globe className="mr-2 h-4 w-4" />Explore
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3 cursor-pointer">
                                <Bookmark className="mr-2 h-4 w-4" />Bookmarks
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3 cursor-pointer">
                                <BellIcon className="mr-2 h-4 w-4" />Notifications
                            </DropdownMenuItem>
                            <ModeToggle />

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="py-3 cursor-pointer" onClick={() => signOut()}>
                                Signout
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="px-2 py-3 text-sm text-muted-foreground">
                                {user.email}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    :
                    <Link href={"/login"}>
                        <Button variant={"default"} className="bg-purple-700 hover:bg-purple-600 text-white">
                            Login
                        </Button>
                    </Link>
                }
            </div>
        </nav>
    )
}





