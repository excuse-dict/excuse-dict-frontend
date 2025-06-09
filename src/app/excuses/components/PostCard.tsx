import {Post} from "@/app/excuses/interfaces/PostInterface";
import {formatDate} from "@/app/excuses/functions/FormatDate";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {useState} from "react";

interface PostCardProps {
    post: Post;
}

export default function PostCard({post}: PostCardProps) {

    const authState = useAuthState()
    const {id} = authState;
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<Array<Object>>([]);

    const isMine = (): boolean => {
        return post.author.id === id;
    }

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        // 버튼이나 입력 필드 클릭시에는 카드 확장 방지
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
            return;
        }
        setExpanded(!isExpanded);
    }

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newComment.trim()) {
            // TODO: 댓글 추가 로직 구현
            setNewComment('');
        }
    }

    return (
        <article
            className={`global_button !cursor-default !bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 ${
                isExpanded ? 'shadow-xl' : ''
            }`}
        >
            {/*상단 섹션*/}
            <section
                className={'cursor-pointer'}
                onClick={handleCardClick}
            >
                {/* 작성자 정보 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {post.author.nickname?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <p className={`font-semibold ${isMine() ? 'text-[var(--strong-purple)]' : 'text-gray-800'}`}>
                                {post.author.nickname || '익명'}
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                        </div>
                    </div>

                    {/* 확장 상태 표시 아이콘 */}
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </div>

                {/* 상황 (제목) */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 leading-relaxed">
                    {post.excuse.situation || '제목 없음'}
                </h2>

                {/* 변명 내용 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 leading-relaxed">
                        {post.excuse.excuse || '내용 없음'}
                    </p>
                </div>

                {/* 투표 버튼, 댓글수 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors group"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}>
                            <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                            <span className="font-semibold">{post.upvoteCount || 0}</span>
                        </button>

                        <button
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors group"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}>
                            <span className="text-lg group-hover:scale-110 transition-transform">👎</span>
                            <span className="font-semibold">{post.downvoteCount || 0}</span>
                        </button>

                        <button
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-200 group hover:bg-blue-50 px-3 py-1.5 rounded-lg"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}>
                            <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                            <span className="font-semibold">{post.commentCount}</span>
                        </button>
                    </div>
                    <div className={'flex gap-2'}>
                        {post.excuse.tags.map((tag: any, index: number) => {
                            return <span
                                key={index}
                                className={'text-blue-500 text-sm'}
                            >{`#${(tag as { value: string }).value}`}
                        </span>;
                        })}
                    </div>
                </div>
            </section>

            {/* 댓글 섹션 - 확장될 때만 표시 */}
            <section className={`overflow-hidden transition-all duration-300 !cursor-default ${
                isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
                <div className="border-t border-gray-100 pt-6">
                    {/* 댓글 헤더 */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            댓글 ({post.commentCount})
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
        </article>
    );
}