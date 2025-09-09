import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {MemberInterface} from "@/app/members/MemberInterface";
import {CommentVoteInterface, VoteInterface, VoteType} from "@/app/excuses/votes/VoteInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_VOTE_TO_COMMENT} from "@/app/constants/constants";
import {UpdateCommentDto} from "@/app/excuses/comments/hooks/useComment";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import {useContext, useState} from "react";
import {ReplyContext} from "@/app/excuses/contexts/ReplyContext";
import Swal from "sweetalert2";
import ReplyList from "@/app/excuses/comments/components/ReplyList";
import CommentCore from "@/app/excuses/comments/components/CommentCore";
import {ReplyInterface, UpdateReplyDto} from "@/app/excuses/comments/hooks/useReply";
import ReplyCore from "@/app/excuses/comments/components/ReplyCore";

export default function Reply({reply, updateReply}: {
    reply: ReplyInterface,
    updateReply: (value: UpdateReplyDto) => void,
}) {

    const {memberId} = useAuthState();

    const [isRepliesExpanded, setRepliesExpanded] = useState(false);
    const { replyInput, setReplyInput } = useContext(ReplyContext);

    const handleVote = (voteType: VoteType) => {

        if (!memberId) {
            askToLogin();
            return;
        }

    }

    const handleReplySubmit = () => {
        Swal.fire("대댓글 등록");
    }

    return (
        <div>
            {/*댓글 본체*/}
            <ReplyCore
                reply={reply}
                handleVote={handleVote}
            >
            </ReplyCore>
            {/*{isRepliesExpanded ?
                <ReplyList
                    replies={}
                    updateReply={}
                    nextPageSize={}
                    loadMoreReplies={}>
                </ReplyList> : <></>}*/}
            {/*대댓글 입력창*/}
            {isRepliesExpanded ? <div className="bg-gray-50">
                <CommentForm
                    commentInput={replyInput}
                    setCommentInput={setReplyInput}
                    handleCommentSubmit={handleReplySubmit}
                    hideProfileImage={true}>
                </CommentForm>
            </div> : <></>}
        </div>
    );
}