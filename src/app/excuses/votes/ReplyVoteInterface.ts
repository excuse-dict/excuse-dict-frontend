import {VoteType} from "@/app/excuses/votes/VoteInterface";

export interface ReplyVoteInterface{
    replyId: number,
    memberId: number,
    voteType: VoteType,
}