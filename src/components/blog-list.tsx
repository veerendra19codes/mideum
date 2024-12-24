import { BlogCard } from "@/components/blog-card"
import { PostType } from "@/types"

interface BlogListProps {
    blogs: PostType[] | []
}

export function BlogList({ blogs }: BlogListProps) {

    return (
        <div className="space-y-6 max-h-[900px]  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll" style={{ direction: 'rtl' }}>
            {blogs.length > 0 && blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
            ))}
        </div>
    )
}

