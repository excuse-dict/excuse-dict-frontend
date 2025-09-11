import {MemberInterface} from "@/app/members/MemberInterface";
import {CommentVoteInterface, VoteType} from "@/app/excuses/votes/VoteInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_REPLIES, EP_VOTE_TO_COMMENT, REPLY_PAGE_SIZE} from "@/app/constants/constants";
import {UpdateCommentDto, useComment} from "@/app/excuses/comments/hooks/useComment";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import React, {useContext, useEffect} from "react";
import {ReplyContext} from "@/app/excuses/contexts/ReplyContext";
import Swal from "sweetalert2";
import CommentCore from "@/app/excuses/comments/components/CommentCore";
import {useReply} from "@/app/excuses/comments/hooks/useReply";
import {usePage} from "@/global_components/page/usePage";
import ReplyList from "@/app/excuses/comments/components/ReplyList";
import {toast} from "react-toastify";

export interface CommentInterface {
    postId: string,
    id: number,
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

export default function Comment({comment, commentHook, isRepliesExpanded, setExpandedComment}: {
    comment: CommentInterface,
    commentHook: ReturnType<typeof useComment>
    isRepliesExpanded: boolean,
    setExpandedComment: (value: number) => void,
}) {

    const { replyInput, setReplyInput } = useContext(ReplyContext);
    const replyPageHook = usePage();
    const { currentPage, setCurrentPage, nextPageSize, loadMoreContents, addElementsAndUpdatePageInfo } = replyPageHook;
    const { updateComment } = commentHook;
    const { replies, getReplies, setReplies, updateReply } = useReply({comment: comment, pageHook: replyPageHook});

    useEffect(() => {
        if(!isRepliesExpanded) return

        // 대댓글 펼쳐질 때 서버에서 조회
        getReplies(comment.id);
    }, [isRepliesExpanded, currentPage, comment.id]);

    useEffect(() => {
        if(isRepliesExpanded) return;

        // 답글 목록 접을 때 상태 초기화
        setReplies([]);
        setCurrentPage(1);
    }, [isRepliesExpanded]);

    const toggleRepliesExpanded = () => {
        // 이미 펼쳐져 있었으면 접기 (0으로 초기화)
        const expandedCommentId = isRepliesExpanded ? 0 : comment.id;
        setExpandedComment(expandedCommentId);
        // 대댓글 입력값 초기화
        setReplyInput('');
    }

    // 대댓글 작성 요청
    const handlePostReply = () => {
        apiPost({
            endPoint: EP_REPLIES(comment.id),
            body: {
                comment: replyInput
            },
            onSuccess: (response) => {
                toast.success("답글이 등록되었습니다.");
                setReplyInput('');
                updateComment({
                    commentId: comment.id,
                    updatedData: {
                        replyCount: response.data?.data?.number,
                    }
                })
                addElementsAndUpdatePageInfo(1, REPLY_PAGE_SIZE);
            }
        })
    }

    return (
        <div>
            {/*댓글 본체*/}
            <CommentCore
                comment={comment}
                commentHook={commentHook}
                toggleRepliesExpanded={toggleRepliesExpanded}
            >
            </CommentCore>
            {isRepliesExpanded ?
                <ReplyList
                    replies={replies}
                    updateReply={updateReply}
                    nextPageSize={nextPageSize}
                    loadMoreReplies={loadMoreContents}>
                </ReplyList> : <></>}
            {/*대댓글 입력창*/}
            {isRepliesExpanded ?
                <div className="flex w-full bg-gray-50 border-t pt-6">
                    <p className='ml-8 text-2xl'>⤷</p>
                    <CommentForm
                        commentInput={replyInput}
                        setCommentInput={setReplyInput}
                        handleCommentSubmit={handlePostReply}
                        hideProfileImage={true}>
                    </CommentForm>
                </div> : <></>}
        </div>
    );
}