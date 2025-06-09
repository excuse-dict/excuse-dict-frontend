export interface Post {
    id: string,
    excuse: {
        situation: string,
        excuse: string,
        tags: Array<Object>,
    },
    nickname: string;
    upvoteCount: number;
    downvoteCount: number;
    comments: Array<Object>;
    createdAt: string;
    modifiedAt: string;
}