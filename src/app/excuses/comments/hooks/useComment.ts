import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_COMMENT, EP_UPDATE_OR_DELETE_COMMENT, EP_VOTE_TO_COMMENT} from "@/app/constants/constants";
import {apiGet} from "@/axios/requests/get/apiGet";
import {useState} from "react";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {usePage} from "@/global_components/page/usePage";
import {apiDelete} from "@/axios/requests/delete/apiDelete";
import {toast} from "react-toastify";
import {VoteType} from "@/app/excuses/votes/VoteInterface";
import {usePostState} from "@/app/excuses/hooks/usePostState";


export interface UpdateCommentDto{
    commentId: number,
    updatedData: Partial<CommentInterface>
}

export const useComment = ({ postHook, pageHook }: {
    postHook: ReturnType<typeof usePostState>,
    pageHook: ReturnType<typeof usePage>
}) => {

    const { post, lowerCommentCount } = postHook;
    const { currentPage, setCurrentPage, setPageInfo } = pageHook;

    const [comments, setComments] = useState<Array<CommentInterface>>([]);
    const [commentInput, setCommentInput] = useState('');
    const [commentCount, setCommentCount] = useState(post.commentCount);

    // 댓글 작성 요청
    const handleCommentSubmit = () => {
        apiPost({
            endPoint: EP_COMMENT(post.postId),
            body: {
                comment: commentInput,
            },
            onSuccess: () => {
                // 댓글 작성시 조회요청 다시
                setCurrentPage(0);
                setCommentCount(commentCount + 1);
                setCommentInput('');
            }
        })
    }

    // 댓글 조회 요청
    const getComments = () => {
        apiGet({
            endPoint: EP_COMMENT(post.postId),
            params: {
                page: currentPage,
            },
            onSuccess: (response) => {
                const newComments = response.data.data.page.content;

                if (currentPage === 0) {
                    // 0페이지면 새로 설정
                    setComments(newComments);
                } else {
                    // 0페이지가 아니면 기존 댓글에 추가 (누적)
                    setComments(prev => [...prev, ...newComments]);
                }
                setPageInfo(response.data.data.pageInfo);
            },
        })
    }

    // 댓글 추천/비추천
    const voteToComment = ({ comment, memberId, voteType }: {
        comment: CommentInterface,
        memberId: number,
        voteType: VoteType,
    }) => {
        apiPost({
            endPoint: EP_VOTE_TO_COMMENT(comment.id),
            body: {
                voteType: voteType,
            },
            onSuccess: (response) => {
                const isUpvote = response.data.data.data;

                // 댓글 상태 즉시 업데이트
                updateComment({
                    commentId: comment.id,
                    updatedData: {
                        upvoteCount: voteType === "UPVOTE"
                            ? comment.upvoteCount + (isUpvote ? 1 : -1)
                            : comment.upvoteCount,
                        downvoteCount: voteType === "DOWNVOTE"
                            ? comment.downvoteCount + (isUpvote ? 1 : -1)
                            : comment.downvoteCount,
                        myVote: isUpvote ? {
                            commentId: comment.id,
                            memberId: memberId,
                            voteType: voteType,
                        } : null
                    }
                })
            }
        })
    }

    // 댓글 상태 업데이트
    const updateComment = ({ commentId, updatedData }: UpdateCommentDto) => {
        setComments(comments =>
            comments.map(comment =>   // Comment 배열을 순회
                comment.id === commentId
                    ? { ...comment, ...updatedData } // id 일치하면 업데이트
                    : comment                        // 나머지는 냅두기
            )
        );
    };

    // 댓글 삭제 요청
    const deleteComment = (commentId: number) => {
        apiDelete({
            endPoint: EP_UPDATE_OR_DELETE_COMMENT(commentId),
            onSuccess: () => {
                toast.success("댓글이 삭제되었습니다.");

                // 댓글 목록 업데이트
                setComments(comments.filter(comment => comment.id !== commentId));
                // post 댓글 수 업데이트
                lowerCommentCount();
            },
        })
    }

    const lowerReplyCount = (comment: CommentInterface) => {
        comment.replyCount--;
    }

    return {
        comments, setComments,
        commentInput, setCommentInput,
        commentCount, setCommentCount,

        handleCommentSubmit,
        getComments,
        voteToComment,
        updateComment,
        deleteComment,
        lowerReplyCount,
    }
}