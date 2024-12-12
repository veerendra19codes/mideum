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

// interface SessionUserProps {
//     id?: number,
//     username?: string,
//     email?: string
// }

export default function Navbar() {
    // console.log("user in navbar:", user);
    // const [isSearchFocused, setIsSearchFocused] = useState(false)
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

                {/* Search Bar */}
                {/* <div className="hidden md:block flex-grow max-w-xl mx-4">
                    <div className="relative">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-full pl-10"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </div>
                </div> */}

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
                            <DropdownMenuItem className="py-3" onClick={() => router.push(`/u/${user?.username}`)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <WriteBlogDialog />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3" onClick={() => router.push(`/explore`)}>
                                <Globe className="mr-2 h-4 w-4" />Explore
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3">
                                <Bookmark className="mr-2 h-4 w-4" />Bookmarks
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3">
                                <BellIcon className="mr-2 h-4 w-4" />Notifications
                            </DropdownMenuItem>
                            <ModeToggle />

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="py-3" onClick={() => signOut()}>
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
                        <Button variant={"default"} className="bg-purple-700 hover:bg-purple-600">
                            Login
                        </Button>
                    </Link>
                }
            </div>
        </nav>
    )
}





