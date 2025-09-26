import {ReplyInterface, useReply} from "@/app/excuses/comments/hooks/useReply";
import Reply from "@/app/excuses/comments/components/Reply";

export default function ReplyList({ replies, replyHook, nextPageSize, loadMoreReplies}: {
    replies: Array<ReplyInterface>,
    replyHook: ReturnType<typeof useReply>
    nextPageSize: number,
    loadMoreReplies: () => void,
}) {
    return (
        <div>
            {/*대댓글 리스트*/}
            <ul className="list-none">
                {replies.map((comment: ReplyInterface) => (
                    <li key={comment.id}>
                        <Reply
                            reply={comment}
                            replyHook={replyHook}
                        />
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