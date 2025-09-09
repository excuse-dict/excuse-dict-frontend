import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {MemberInterface} from "@/app/members/MemberInterface";
import {CommentVoteInterface, VoteInterface, VoteType} from "@/app/excuses/votes/VoteInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_REPLIES, EP_VOTE_TO_COMMENT} from "@/app/constants/constants";
import {UpdateCommentDto} from "@/app/excuses/comments/hooks/useComment";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import {useContext, useState} from "react";
import {ReplyContext} from "@/app/excuses/contexts/ReplyContext";
import {ReplyInterface, UpdateReplyDto} from "@/app/excuses/comments/hooks/useReply";
import ReplyCore from "@/app/excuses/comments/components/ReplyCore";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";

export default function Reply({reply, updateReply, comment}: {
    reply: ReplyInterface,
    updateReply: (value: UpdateReplyDto) => void,
    comment: CommentInterface,
}) {

    const {memberId} = useAuthState();

    const handleVote = (voteType: VoteType) => {
        if (!memberId) {
            askToLogin();
            return;
        }
    }

    return (
        <div>
            {/*댓글 본체*/}
            <ReplyCore
                reply={reply}
                handleVote={handleVote}
            >
            </ReplyCore>
        </div>
    );
}