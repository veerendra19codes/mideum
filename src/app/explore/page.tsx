"use client";

import { BlogList } from "@/components/blog-list"
import { FilterDialog } from "@/components/filter-dialog"
import { FilterSidebar } from "@/components/filter-sidebar"
import { filters } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Explore() {
    const [blogs, setBlogs] = useState([]);
    const [filters, setFilters] = useState<filters>({
        author: "",
        title: "",
        tags: "",
        dateFrom: "",
        dateTo: "",
        sortBy: "",
    });

    const fetchBlogs = useCallback(async () => {
        try {
            // console.log("called")
            const res = await axios.post("/api/posts/get/getall", filters);
            // console.log("res:", res);

            if (res.status == 200) {
                setBlogs(res.data.posts);
            }
            else {
                alert("error in fetching blogs, please try again later")
            }
        } catch (error) {
            console.log("error in fetching blogs:", error);
            alert("error in fetching blogs, please try again later");
        }
    }, [filters]);


    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs])

    return (
        <div className="container mx-4 md:mx-auto py-2 md:py-8 w-4/5">
            <h1 className="text-3xl font-bold mb-2 md:mb-8 ">All Blogs</h1>
            <div className="flex flex-col md:flex-row gap-8">

                <div className="md:hidden w-full">
                    <FilterDialog filters={filters} setFilters={setFilters} />
                </div>

                <div className="w-full md:w-[70%] max-h-[900px] overflow-y-auto">
                    <BlogList blogs={blogs} />
                </div>
                <div className="w-full md:w-[30%] hidden md:block">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>
            </div>
        </div>
    )
}

