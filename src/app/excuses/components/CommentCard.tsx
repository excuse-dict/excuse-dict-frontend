import {formatDate} from "@/app/excuses/functions/FormatDate";
import {Post} from "@/app/excuses/interfaces/PostInterface";
import {useState} from "react";

export default function CommentCard({ isExpanded, post }: {
    isExpanded: boolean,
    post: Post,
}){
    const [comments, setComments] = useState<Array<Object>>([]);
    const [newComment, setNewComment] = useState<string>('');

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newComment.trim()) {
            // TODO: 댓글 추가 로직 구현
            setNewComment('');
        }
    }

    return (
        <section className={`overflow-hidden transition-all duration-300 !cursor-default ${
            isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
            <div className="border-t border-gray-100 pt-6">
                {/* 댓글 헤더 */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        댓글 ({post?.commentCount || 0})
                    </h3>
                </div>

                {/* 댓글 작성 폼 - 하이라이트 개선 */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex items-start space-x-3">
                        <div
                            className="w-8 h-8 bg-[var(--strong-purple)] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            나
                        </div>
                        <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none transition-all duration-200
                                             focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[var(--strong-purple)]
                                             hover:border-purple-300 bg-white shadow-sm
                                             placeholder:text-gray-400"
                                    rows={3}
                                    placeholder="댓글을 입력하세요..."
                                    onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => e.stopPropagation()}
                                />
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="global_button !bg-[var(--strong-purple)] !text-white px-6 py-2.5 rounded-lg disabled:from-gray-300 disabled:to-gray-400
                                                 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium
                                                 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                                >
                                    댓글 작성
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* 댓글 목록 */}
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment: any, index: number) => (
                            <div key={index}
                                 className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div
                                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {comment.author?.nickname?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">
                                                {comment.author?.nickname || '익명'}
                                            </span>
                                        <span className="text-xs text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
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
                </div>
            </div>
        </section>
    );
}