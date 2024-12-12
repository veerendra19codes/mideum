"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { filters } from '@/types';

interface FilterSidebarProps {
    filters: filters;
    setFilters: (filters: filters) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
    const [author, setAuthor] = useState(filters.author || "");
    const [title, setTitle] = useState(filters.title || "");
    const [tags, setTags] = useState(filters.tags || "");
    const [dateFrom, setDateFrom] = useState(filters.dateFrom || "");
    const [dateTo, setDateTo] = useState(filters.dateTo || "");
    const [sortBy, setSortBy] = useState(filters.sortBy || "");

    const handleFilter = () => {
        setFilters({
            author,
            title,
            tags,
            dateFrom,
            dateTo,
            sortBy,
        });
    };

    const clearFilters = () => {
        setAuthor("");
        setTitle("");
        setTags("");
        setDateFrom("");
        setDateTo("");
        setSortBy("");
        setFilters({});
    };
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    placeholder="Filter by author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    placeholder="Filter by title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                    id="tags"
                    placeholder="Filter by tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date-from">Date From</Label>
                <Input
                    id="date-from"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date-to">Date To</Label>
                <Input
                    id="date-to"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sort-by">Sort By</Label>
                <Select onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Select sorting option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="likes-high-low">Likes: High to Low</SelectItem>
                        <SelectItem value="likes-low-high">Likes: Low to High</SelectItem>
                        <SelectItem value="comments-high-low">Comments: High to Low</SelectItem>
                        <SelectItem value="comments-low-high">Comments: Low to High</SelectItem>
                        <SelectItem value="bookmarks-high-low">Bookmarks: High to Low</SelectItem>
                        <SelectItem value="bookmarks-low-high">Bookmarks: Low to High</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full flex justify-between gap-4">
                <Button onClick={handleFilter} className="w-1/2">Apply Filters</Button>
                <Button onClick={clearFilters} className="w-1/2">Clear Filters</Button>
            </div>
        </div>
    )
}

