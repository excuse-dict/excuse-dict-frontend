import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {useEffect} from "react";
import {usePage} from "@/global_components/page/usePage";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import {useComment} from "@/app/excuses/comments/hooks/useComment";
import CommentList from "@/app/excuses/comments/components/CommentList";
import {usePostState} from "@/app/excuses/hooks/usePostState";

export default function CommentCard<T extends PostInterface>({isExpanded, postHook}: {
    isExpanded: boolean,
    postHook: ReturnType<typeof usePostState<T>>,
}) {

    const commentPageHook = usePage();
    const { currentPage, nextPageSize, loadMoreContents } = commentPageHook;
    const commentHook = useComment({
        postHook: postHook,
        pageHook: commentPageHook
    });
    const {
        commentCount, commentInput, setCommentInput,
        comments, handleCommentSubmit, getComments,
    } = commentHook;

    const { post } = postHook;

    // 댓글 가져오기
    useEffect(() => {
        if (!isExpanded) return;
        getComments();

    }, [isExpanded, currentPage, commentCount]);


    return (
        <section className={`overflow-hidden transition-all duration-300 !cursor-default ${
            isExpanded ? 'opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
            <div className="border-t border-gray-100 pt-6">
                {/* 댓글 헤더 */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        댓글 ({post.commentCount})
                    </h3>
                </div>

                {/* 댓글 작성 폼 */}
                <CommentForm
                    commentInput={commentInput}
                    setCommentInput={setCommentInput}
                    handleCommentSubmit={handleCommentSubmit}
                ></CommentForm>

                {/* 댓글 목록 */}
                <CommentList
                    comments={comments}
                    commentHook={commentHook}
                    nextPageSize={nextPageSize}
                    loadMoreComments={loadMoreContents}>
                </CommentList>
            </div>
        </section>
    );
}
