export interface Post {
    id: string,
    excuse: {
        situation: string,
        excuse: string,
        tags: Array<Object>,
    },
    author: any;
    upvoteCount: number;
    downvoteCount: number;
    commentCount: number;
    createdAt: string;
    modifiedAt: string;
}