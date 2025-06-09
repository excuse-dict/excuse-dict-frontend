import {Post} from "@/app/excuses/interfaces/PostInterface";
import {formatDate} from "@/app/excuses/functions/FormatDate";

export default function PostCard({post}: {
    post: Post
}) {
    return (
        <article
            className="global_button !bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
            onClick={() => window.location.href = `/excuses/${post.id}`}
        >
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {post.nickname?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{post.nickname || '익명'}</p>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
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
                        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors group">
                        <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                        <span className="font-semibold">{post.upvoteCount || 0}</span>
                    </button>

                    <button
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors group">
                        <span className="text-lg group-hover:scale-110 transition-transform">👎</span>
                        <span className="font-semibold">{post.downvoteCount || 0}</span>
                    </button>

                    {/*댓글수 표시*/}
                    <button
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-200 group hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                        <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                        <span className="font-semibold">{post.comments.length}</span>
                        <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors"></span>
                    </button>
                </div>
                <div className={'flex gap-2'}>
                    {post.excuse.tags.map((tag: any, index) => {
                        return <span
                            key={index}
                            className={'text-blue-500 text-sm'}
                        >{`#${tag.value}`}
                        </span>;
                    })}
                </div>
            </div>
        </article>
    );
}