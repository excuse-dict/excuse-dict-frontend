import {Post} from "@/app/excuses/posts/PostInterface";
import {useEffect, useState} from "react";
import {usePage} from "@/global_components/page/usePage";
import Comment, {CommentInterface} from "@/app/excuses/comments/components/Comment";
import CommentForm from "@/app/excuses/comments/components/CommentForm";
import {useComment} from "@/app/excuses/comments/hooks/useComment";

export default function CommentCard({ isExpanded, post }: {
    isExpanded: boolean,
    post: Post,
}){

    const { setPageInfo, currentPage, setCurrentPage, nextPageSize } = usePage();
    const {
        commentCount, commentInput, setCommentInput,
        comments, handleCommentSubmit, getComments,
        loadMoreComments, updateComment
    } = useComment({
        post: post,
        setPageInfo: setPageInfo,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
    });

    // 댓글 가져오기
    useEffect(() => {
        if(!isExpanded) return;
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
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment: CommentInterface, index: number) => (
                            /*개별 댓글*/
                            <Comment key={index} comment={comment} updateComment={updateComment}></Comment>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div
                                className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💬</span>
                            </div>
                            <p className="text-gray-500 mb-2 font-medium">아직 댓글이 없습니다.</p>
                            <p className="text-sm text-gray-400">첫 번째 댓글을 작성해보세요!</p>
                        </div>
                    )}
                    {nextPageSize <= 0 ? <></> : <div
                        className={'text-blue-500 cursor-pointer text-center'}
                        onClick={loadMoreComments}
                    >
                        <span>🡻</span>
                        <span className={'underline underline-offset-2'}>{`댓글 ${nextPageSize}개 더보기`}</span>
                    </div>}
                </div>
            </div>
        </section>
    );
}
