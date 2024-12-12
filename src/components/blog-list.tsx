import { BlogCard } from "@/components/blog-card"
import { BlogProps } from "@/types"

// // This would typically come from an API or database
// const blogs = [
//     {
//         author: {
//             name: "John Doe",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "The Future of AI in Web Development",
//         content: "Artificial Intelligence is rapidly changing the landscape of web development. From intelligent chatbots to personalized user experiences, AI is revolutionizing how we build and interact with websites. In this article, we'll explore the current state of AI in web development and look at some exciting future possibilities.",
//         tags: ["AI", "Web Development", "Future Tech"],
//         publishDate: "2023-05-15",
//         likes: 120,
//         comments: 25,
//         bookmarks: 50,
//     },
//     {
//         author: {
//             name: "Jane Smith",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "Mastering React Hooks",
//         content: "React Hooks have transformed how we write React components, making it easier to reuse stateful logic and manage side effects. This comprehensive guide will take you through the most commonly used hooks, including useState, useEffect, useContext, and more. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more efficient React code.",
//         tags: ["React", "JavaScript", "Web Development"],
//         publishDate: "2023-05-10",
//         likes: 89,
//         comments: 15,
//         bookmarks: 30,
//     },
//     {
//         author: {
//             name: "Jane Smith",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "Mastering React Hooks",
//         content: "React Hooks have transformed how we write React components, making it easier to reuse stateful logic and manage side effects. This comprehensive guide will take you through the most commonly used hooks, including useState, useEffect, useContext, and more. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more efficient React code.",
//         tags: ["React", "JavaScript", "Web Development"],
//         publishDate: "2023-05-10",
//         likes: 89,
//         comments: 15,
//         bookmarks: 30,
//     },
//     {
//         author: {
//             name: "Jane Smith",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "Mastering React Hooks",
//         content: "React Hooks have transformed how we write React components, making it easier to reuse stateful logic and manage side effects. This comprehensive guide will take you through the most commonly used hooks, including useState, useEffect, useContext, and more. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more efficient React code.",
//         tags: ["React", "JavaScript", "Web Development"],
//         publishDate: "2023-05-10",
//         likes: 89,
//         comments: 15,
//         bookmarks: 30,
//     },
//     {
//         author: {
//             name: "Jane Smith",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "Mastering React Hooks",
//         content: "React Hooks have transformed how we write React components, making it easier to reuse stateful logic and manage side effects. This comprehensive guide will take you through the most commonly used hooks, including useState, useEffect, useContext, and more. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more efficient React code.",
//         tags: ["React", "JavaScript", "Web Development"],
//         publishDate: "2023-05-10",
//         likes: 89,
//         comments: 15,
//         bookmarks: 30,
//     },
//     {
//         author: {
//             name: "Jane Smith",
//             avatar: "https://github.com/shadcn.png",
//         },
//         title: "Mastering React Hooks",
//         content: "React Hooks have transformed how we write React components, making it easier to reuse stateful logic and manage side effects. This comprehensive guide will take you through the most commonly used hooks, including useState, useEffect, useContext, and more. By the end, you'll have a solid understanding of how to leverage hooks to write cleaner, more efficient React code.",
//         tags: ["React", "JavaScript", "Web Development"],
//         publishDate: "2023-05-10",
//         likes: 89,
//         comments: 15,
//         bookmarks: 30,
//     },
//     // Add more blog posts as needed
// ]



interface BlogListProps {
    blogs: BlogProps[]
}

export function BlogList({ blogs }: BlogListProps) {

    return (
        <div className="space-y-6 max-h-[900px]  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll px-4" style={{ direction: 'rtl' }}>
            {blogs.length > 0 && blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
            ))}
        </div>
    )
}

