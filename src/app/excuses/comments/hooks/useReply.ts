import {useState} from "react";
import {MemberInterface} from "@/app/members/MemberInterface";
import {ReplyVoteInterface} from "@/app/excuses/votes/ReplyVoteInterface";

export interface ReplyInterface {
    id: number,
    content: string,
    author: MemberInterface,
    upvoteCount: number,
    downvoteCount: number,
    replyCount: number,
    myVote: ReplyVoteInterface,
}

export const useReply = () => {
    const [replies, setReplies] = useState([]);

    return {
        replies, setReplies
    }
}