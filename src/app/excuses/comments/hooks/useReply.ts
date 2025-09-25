import {useContext, useState} from "react";
import {MemberInterface} from "@/app/members/MemberInterface";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {usePage} from "@/global_components/page/usePage";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_REPLIES, EP_UPDATE_OR_DELETE_REPLY, EP_VOTE_TO_REPLY, REPLY_PAGE_SIZE} from "@/app/constants/constants";
import {apiPost} from "@/axios/requests/post/apiPost";
import {ReplyContext} from "@/app/excuses/contexts/ReplyContext";
import {toast} from "react-toastify";
import {useComment} from "@/app/excuses/comments/hooks/useComment";
import {ReplyVoteInterface, VoteInterface, VoteType} from "@/app/excuses/votes/VoteInterface";
import {apiDelete} from "@/axios/requests/delete/apiDelete";

export interface ReplyInterface {
    id: number,
    content: string,
    author: MemberInterface,
    upvoteCount: number,
    downvoteCount: number,
    myVote: ReplyVoteInterface | null,
    createdAt: string,
    modifiedAt: string,
}

export interface UpdateReplyDto{
    replyId: number,
    updatedData: Partial<ReplyInterface>
}

export const useReply = ({ comment, commentHook, pageHook }: {
    comment: CommentInterface,
    commentHook: ReturnType<typeof useComment>
    pageHook: ReturnType<typeof usePage>,
}) => {

    const { replyInput, setReplyInput } = useContext(ReplyContext);
    const { updateComment, lowerReplyCount } = commentHook;
    const { currentPage, setPageInfo, addElementsAndUpdatePageInfo } = pageHook;
    const [replies, setReplies] = useState<Array<ReplyInterface>>([]);

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

    // 대댓글 조회 요청
    const getReplies = (commentId: number) => {
        apiGet({
            endPoint: EP_REPLIES(commentId),
            onSuccess: (response) => {
                const newReplies = response.data.data.page.content;

                if (currentPage === 0) {
                    // 0페이지면 새로 설정
                    setReplies(newReplies);
                } else {
                    // 0페이지가 아니면 기존 답글에 추가 (누적)
                    setReplies(prev => [...prev, ...newReplies]);
                }
                setPageInfo(response.data.data.pageInfo);
            },
            params: {
                page: currentPage,
                size: REPLY_PAGE_SIZE
            }
        })
    }

    // 답글 추천/비추천
    const voteToReply = ({ reply, voteType }: {
        reply: ReplyInterface,
        voteType: VoteType,
    }) => {
        apiPost({
            endPoint: EP_VOTE_TO_REPLY(reply.id),
            body: {
                voteType: voteType,
            },
            onSuccess: (response) => {
                const isUpvote = response.data.data.data;

                // 대댓글 상태 즉시 업데이트
                updateReply({
                    replyId: reply.id,
                    updatedData: {
                        upvoteCount: voteType === "UPVOTE"
                            ? reply.upvoteCount + (isUpvote ? 1 : -1)
                            : reply.upvoteCount,
                        downvoteCount: voteType === "DOWNVOTE"
                            ? reply.downvoteCount + (isUpvote ? 1 : -1)
                            : reply.downvoteCount,
                        myVote: isUpvote ? {
                            replyId: reply.id,
                            voteType: voteType,
                        } : null
                    }
                })
            },
        });
    }

    // 대댓글 상태 업데이트
    const updateReply = ({ replyId, updatedData }: UpdateReplyDto) => {
        setReplies(replies =>
            replies.map(reply =>    // Reply 배열을 순회
                reply.id === replyId
                    ? { ...reply, ...updatedData }  // id 일치하면 업데이트
                    : reply                         // 나머지는 냅두기
            )
        );
    }

    // 답글 삭제 요청
    const deleteReply = (replyId: number) => {
        apiDelete({
            endPoint: EP_UPDATE_OR_DELETE_REPLY(replyId),
            onSuccess: () => {
                toast.success("댓글이 삭제되었습니다.");

                // 댓글 목록 업데이트
                setReplies(replies.filter(reply => reply.id !== replyId));
                // 원댓글 답글 수 업데이트
                lowerReplyCount(comment);
            }
        })
    }

    return {
        replies, setReplies,
        getReplies,
        handlePostReply,
        voteToReply,
        updateReply,
        deleteReply,
    }
}