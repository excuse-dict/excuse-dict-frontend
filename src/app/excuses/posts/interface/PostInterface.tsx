import TagInterface from "@/app/excuses/new/components/TagInterface";
import {VoteInterface} from "@/app/excuses/votes/VoteInterface";
import {MemberInterface} from "@/app/members/MemberInterface";

export interface PostInterface {
    postId: number,
    excuse: {
        situation: string,
        excuse: string,
        tags: Array<TagInterface>,
    },
    author: MemberInterface;
    matchedWords: Array<string>,
    matchedTags: Array<string>,
    upvoteCount: number;
    downvoteCount: number;
    myVote: VoteInterface;
    commentCount: number;
    createdAt: string;
    modifiedAt: string;
}