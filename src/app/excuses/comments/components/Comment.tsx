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

    const [isReplyFormOpen, setReplyFormOpen] = useState(false);
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
            <div
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {comment.author?.nickname?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">
                        {comment.author?.nickname || '익명'}
                    </span>
                        <span className="text-xs text-gray-500">
                        {getDatetimeFormat(comment.createdAt)}
                    </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.content}
                    </p>
                    <div className={'flex gap-2 font-light text-sm'}>
                        {/*추천 버튼*/}
                        <button
                            className={`${myVote?.voteType === "UPVOTE" ? 'text-green-500 font-bold' : ''}`}
                            onClick={() => handleVote("UPVOTE")}
                        >{`👍${comment.upvoteCount}`}</button>
                        {/*비추천 버튼*/}
                        <button
                            className={`${myVote?.voteType === "DOWNVOTE" ? 'text-red-500 font-bold' : ''}`}
                            onClick={() => handleVote("DOWNVOTE")}
                        >{`👎${comment.downvoteCount}`}</button>
                        <p>💬</p>
                        <p>{comment.replyCount}</p>
                    </div>
                </div>
            </div>
            {/*대댓글 입력창*/}
            {isReplyFormOpen ? <div className="bg-gray-50">
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