import { PostCard } from '@/components/post-card'
import { PostType } from '@/types'

interface UserProps {
    activeTab: string,
    userPosts: PostType[],
    bookmarkedPosts: PostType[],
}

export function PostList({ activeTab,userPosts, bookmarkedPosts  }: UserProps) {

    return (
        <div className=" space-y-4 md:space-y-8">
            {activeTab == "posts"  &&  userPosts?.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
            ))}
            {activeTab == "bookmarks"  &&  bookmarkedPosts?.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

