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

export interface CommentInterface {
    postId: string,
    id: string,
    content: string,
    isReply: boolean,
    author: MemberInterface,
    myVote: CommentVoteInterface | null,
    upvoteCount: number,
    downvoteCount: number,
    replyCount: number,
    createdAt: string,
    modifiedAt: string,
}

export default function Comment({comment, updateComment}: {
    comment: CommentInterface,
    updateComment: (value: UpdateCommentDto) => void,
}) {

    const {myVote} = comment;
    const {memberId} = useAuthState();

    const [isRepliesExpanded, setRepliesExpanded] = useState(false);
    const { replyInput, setReplyInput } = useContext(ReplyContext);

    const handleVote = (voteType: VoteType) => {

        /*console.log("memberId: ", memberId);
        console.log("comment: ", comment);*/

        if (!memberId) {
            askToLogin();
            return;
        }

        apiPost({
            endPoint: EP_VOTE_TO_COMMENT(comment.id),
            body: {
                voteType: voteType,
            },
            onSuccess: (response) => {
                const isVoting = response.data.data.data;

                updateComment({
                    commentId: comment.id,
                    updatedData: {
                        upvoteCount: voteType === "UPVOTE"
                            ? comment.upvoteCount + (isVoting ? 1 : -1)
                            : comment.upvoteCount,
                        downvoteCount: voteType === "DOWNVOTE"
                            ? comment.downvoteCount + (isVoting ? 1 : -1)
                            : comment.downvoteCount,
                        myVote: isVoting ? {
                            commentId: comment.id,
                            memberId: memberId,
                            voteType: voteType,
                        } : null
                    }
                })
            }
        })
    }

    const handleReplySubmit = () => {
        Swal.fire("대댓글 등록");
    }

    return (
        <div>
            {/*댓글 본체*/}
            <CommentCore
                comment={comment}
                handleVote={handleVote}
            >
            </CommentCore>
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