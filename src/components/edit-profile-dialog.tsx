'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useUserContext } from '@/contexts/userContext'

interface User {
    name?: string
    username?: string
    bio?: string
}

interface EditProfileDialogProps {
    user: User,
}

export function EditProfileDialog({ user }: EditProfileDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState<string>(user.name || "")
    const [bio, setBio] = useState<string>(user.bio || "")
    const [image, setImage] = useState<File | null>(null);
    const { setUser } = useUserContext();

    const handleProfileUpdate = async () => {
        try {
            // console.log("body:", name, bio);
            const form = new FormData();
            if(image) form.set("file", image);
            form.set("name", name);
            form.set("bio", bio);
            const res = await axios.put(`/api/profile/edit`, form)
            console.log("res:", res);
            if (res.status == 200) {
                setIsOpen(false);
                alert("profile updated");
                setUser(res.data.updatedProfile)
            }
            else {
                alert("something went wrong")
            }
        } catch (error) {
            console.log("error in updating profile:", error);
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">Edit profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                            Profile Image
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleProfileUpdate}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

