export type VoteType = "UPVOTE" | "DOWNVOTE";

export interface VoteInterface {
    postId: string | number,
    memberId: string | number,
    voteType: VoteType,
}

export interface CommentVoteInterface{
    commentId: string | number,
    memberId: string | number,
    voteType: VoteType,
}

export interface ReplyVoteInterface{
    replyId: string | number,
    voteType: VoteType,
}