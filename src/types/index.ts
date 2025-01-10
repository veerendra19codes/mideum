export interface UserType {
    id: number;
    email: string;
    username: string;
    name?: string;
    bio?: string;
    image?: string;
    posts?: PostType[] | [];
    likes?: LikeType[] | [];
    bookmarks?: BookmarkType[] | [];
}

export interface PostType {
    id: number;
    createdAt: string; // ISO string for date
    updatedAt: string; // ISO string for date
    title: string;
    content?: string;
    image?: string;
    tags: string[];
    published: boolean;
    author: UserType;
    likes: LikeType[];
    bookmarks: BookmarkType[];
    comments: CommentType[]
}

export interface filters {
    author?: string,
    title?: string,
    tags?: string,
    dateFrom?: string,
    dateTo?: string,
    sortBy?: string,

}

export interface LikeType {
    id: number;
    userId: number;
    postId: number;
}

export interface BookmarkType {
    id: number;
    userId: number;
    postId: number;
}

export interface CommentType {
    id: number,
    postId: number,
    userId: number,
    createdAt: number,
    updatedAt: number,
    comment: string,
    user: {
        id: number,
        image?: string,
        username?: string,
        email: string,
        name?: string,
    }
}