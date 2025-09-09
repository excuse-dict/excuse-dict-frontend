import Comment, {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {UpdateCommentDto} from "@/app/excuses/comments/hooks/useComment";

export default function ReplyList({ replies, updateReply, nextPageSize, loadMoreReplies}: {
    replies: Array<CommentInterface>,
    updateReply: (value: UpdateCommentDto) => void,
    nextPageSize: number,
    loadMoreReplies: () => void,
}) {
    return (
        <div className="space-y-4">
            {/*대댓글 리스트*/}
            <ul className="space-y-4 list-none">
                {replies.map((comment: CommentInterface, index: number) => (
                    <li key={comment.id}>
                        <Comment comment={comment} updateComment={updateReply}/>
                    </li>
                ))}
            </ul>

            {/* 더보기 버튼 */}
            {nextPageSize > 0 && (
                <button // div 대신 button 사용
                    className="text-blue-500 cursor-pointer text-center w-full hover:text-blue-600"
                    onClick={loadMoreReplies}
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