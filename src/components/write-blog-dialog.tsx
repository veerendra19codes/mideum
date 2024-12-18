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
import { PlusCircle } from 'lucide-react'

export function WriteBlogDialog({ label }: { label: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { user, fetchUserDetails } = useUserContext();
    console.log("open:", isOpen);

    const handlePublish = async () => {
        console.log("body:", title, content, user?.id);
        try {
            const res = await axios.post(`/api/posts/post`, {
                title,
                content,
                userId: user?.id,
            })
            console.log("res:", res);
            if (res.status == 200) {
                setTitle("");
                setContent("");
                alert("published successfully");
                fetchUserDetails();
                setIsOpen(false);
            }
            else {
                setTitle("");
                setContent("");
                alert("something went wrong");
                setIsOpen(false);
            }
        } catch (error) {
            console.log("error in publishing:", error);
            alert("something went wrong");
        }
    }

    const handleSaveDraft = () => {
        // Here you would typically save the draft to your backend or local storage
        console.log('Saving draft:', { title, content })
        // Optionally close the dialog or show a confirmation message
    }

    return (
        <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-full flex justify-start items-center gap-2 p-2">
                    <PlusCircle />
                    <span className="pl-[6px] hidden lg:block">{label}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] z-[100000]">
                <DialogHeader>
                    <DialogTitle>Write a new blog post</DialogTitle>
                    <DialogDescription>
                        Create your blog post here. Click publish when you&apos;re done, or save as a draft to finish later.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="col-span-3"
                            rows={10}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                        Save as Draft
                    </Button>
                    <div>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="mr-2">
                            Cancel
                        </Button>
                        <Button type="button" onClick={handlePublish} disabled={!user}>
                            Publish
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

