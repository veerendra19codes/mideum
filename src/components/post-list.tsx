import { PostCard } from '@/components/post-card'

interface PostsProps {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    content: string,
    image: string,
    published: boolean,
    authorId: number
}

interface UserProps {
    name?: string
    username?: string
    bio?: string
    posts?: PostsProps[]
}


export function PostList({ user }: { user: UserProps }) {

    return (
        <div className="space-y-8">
            {user.posts && user?.posts?.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

