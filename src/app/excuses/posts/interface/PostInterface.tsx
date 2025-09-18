import TagInterface from "@/app/excuses/new/components/TagInterface";

export interface PostInterface {
    postId: number,
    excuse: {
        situation: string,
        excuse: string,
        tags: Array<TagInterface>,
    },
    author: any;
    upvoteCount: number;
    downvoteCount: number;
    myVote: any;
    commentCount: number;
    createdAt: string;
    modifiedAt: string;
}