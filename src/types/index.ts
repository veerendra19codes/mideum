export interface Author {
    id: number;
    email: string;
    username: string;
    name?: string;
    bio?: string;
    image?: string;
}

export interface Like {
    id: number;
    userId: number;
    postId: number;
}

export interface Bookmark {
    id: number;
    userId: number;
    postId: number;
}

export interface Post {
    id: number;
    createdAt: string; // ISO string for date
    updatedAt: string; // ISO string for date
    title: string;
    content?: string;
    image?: string;
    tags: string[];
    published: boolean;
    author: Author;
    likes: Like[];
    bookmars: Bookmark[];
}

export interface BlogProps {
    posts: Post[];
}

export interface filters {
    author?: string,
    title?: string,
    tags?: string,
    dateFrom?: string,
    dateTo?: string,
    sortBy?: string,
}