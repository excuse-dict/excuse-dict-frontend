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
    comments: Array<Object>;
    createdAt: string;
    modifiedAt: string;
}