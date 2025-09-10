import Comment, {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {UpdateCommentDto} from "@/app/excuses/comments/hooks/useComment";
import {useState} from "react";

export default function CommentList({ comments, updateComment, nextPageSize, loadMoreComments}: {
    comments: Array<CommentInterface>,
    updateComment: (value: UpdateCommentDto) => void,
    nextPageSize: number,
    loadMoreComments: () => void,
}) {

    const [expandedComment, setExpandedComment] = useState(0);

    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                <ul className="space-y-4 list-none">
                    {comments.map((comment: CommentInterface, index: number) => (
                        <li key={comment.id}>
                            <Comment
                                comment={comment}
                                updateComment={updateComment}
                                isRepliesExpanded={comment.id === expandedComment}
                                setExpandedComment={setExpandedComment}
                            />
                        </li>
                    ))}
                </ul>
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

            {/* 더보기 버튼 */}
            {nextPageSize > 0 && (
                <button // div 대신 button 사용
                    className="text-blue-500 cursor-pointer text-center w-full hover:text-blue-600"
                    onClick={loadMoreComments}
                >
                    <span>🡻</span>
                    <span className="underline underline-offset-2">
                        {`댓글 ${nextPageSize}개 더보기`}
                    </span>
                </button>
            )}
        </div>
    );
}