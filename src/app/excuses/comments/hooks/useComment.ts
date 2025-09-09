import {Post} from "@/app/excuses/posts/PostInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_COMMENT} from "@/app/constants/constants";
import {apiGet} from "@/axios/requests/get/apiGet";
import {useState} from "react";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {usePage} from "@/global_components/page/usePage";


export interface UpdateCommentDto{
    commentId: number,
    updatedData: Partial<CommentInterface>
}

export const useComment = ({ post, pageHook }: {
    post: Post,
    pageHook: ReturnType<typeof usePage>
}) => {

    const { currentPage, setCurrentPage, setPageInfo } = pageHook;

    const [comments, setComments] = useState<Array<CommentInterface>>([]);
    const [commentInput, setCommentInput] = useState('');
    const [commentCount, setCommentCount] = useState(post.commentCount);

    // 댓글 작성 요청
    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

    // 댓글 상태 업데이트
    const updateComment = ({ commentId, updatedData }: UpdateCommentDto) => {
        setComments(prev =>
            prev.map(comment =>
                comment.id === commentId
                    ? { ...comment, ...updatedData }
                    : comment
            )
        );
    };

    return {
        comments, setComments,
        commentInput, setCommentInput,
        commentCount, setCommentCount,

        handleCommentSubmit,
        getComments,
        updateComment,
    }
}