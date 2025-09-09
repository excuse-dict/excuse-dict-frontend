import {Post} from "@/app/excuses/posts/PostInterface";
import {useEffect, useState} from "react";
import {usePage} from "@/global_components/page/usePage";
import Comment, {CommentInterface} from "@/app/excuses/comments/components/Comment";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import {useComment} from "@/app/excuses/comments/hooks/useComment";
import CommentList from "@/app/excuses/comments/components/CommentList";

export default function CommentCard({isExpanded, post}: {
    isExpanded: boolean,
    post: Post,
}) {

    const pageHook = usePage();
    const { currentPage, nextPageSize, loadMoreContents } = pageHook;
    const {
        commentCount, commentInput, setCommentInput,
        comments, handleCommentSubmit, getComments,
        updateComment
    } = useComment({
        post: post,
        pageHook: pageHook
    });

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
                        댓글 ({commentCount})
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
                    updateComment={updateComment}
                    nextPageSize={nextPageSize}
                    loadMoreComments={loadMoreContents}>
                </CommentList>
            </div>
        </section>
    );
}
