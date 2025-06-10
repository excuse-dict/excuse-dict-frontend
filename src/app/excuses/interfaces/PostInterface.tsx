export interface Post {
    postId: string,
    excuse: {
        situation: string,
        excuse: string,
        tags: Array<Object>,
    },
    author: any;
    upvoteCount: number;
    downvoteCount: number;
    myVote: Object;
    commentCount: number;
    createdAt: string;
    modifiedAt: string;
}