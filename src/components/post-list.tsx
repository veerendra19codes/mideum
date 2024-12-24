import { PostCard } from '@/components/post-card'
import { PostType, UserType } from '@/types'

interface UserProps {
    user: UserType | null;
}

export function PostList({ user }: UserProps) {

    return (
        <div className=" space-y-4 md:space-y-8">
            {user && user.posts && user?.posts?.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

