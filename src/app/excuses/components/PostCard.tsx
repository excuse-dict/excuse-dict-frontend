import {Post} from "@/app/excuses/interfaces/PostInterface";
import {formatDate} from "@/app/excuses/functions/FormatDate";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {useEffect, useState} from "react";
import CommentCard from "@/app/excuses/components/CommentCard";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_POST, EP_VOTE} from "@/app/constants/constants";
import {usePost} from "@/app/excuses/hook/usePost";

export default function PostCard({postProp}: {
    postProp: Post
}) {

    // 전달받은 객체가 아니라 훅의 post를 써야 함 (props는 상태 관리 까다로움)
    const { post, upvote, cancelUpvote, downvote, cancelDownvote } = usePost(postProp);

    const authState = useAuthState()
    const {id} = authState;
    const [isExpanded, setExpanded] = useState<boolean>(false);

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

    const handleVote = (type: "UPVOTE" | "DOWNVOTE") => {
        apiPost({
            endPoint: EP_VOTE(post.postId),
            body:{
                voteType: type,
            },
            onSuccess: (response) => {
                if(type === "UPVOTE"){
                    if(response.data.data.data){
                        upvote();
                    }else{
                        cancelUpvote();
                    }
                }else{
                    if(response.data.data.data){
                        downvote();
                    }else {
                        cancelDownvote();
                    }
                }
            }
        })
    }

    if(!post) return <></>;

    const myVoteType = post?.myVote?.voteType;

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
                        {/*추천 버튼*/}
                        <button
                            className={`flex items-center space-x-2 transition-all duration-200 group px-3 py-1.5 rounded-lg ${
                                myVoteType === "UPVOTE"
                                    ? 'text-green-700 bg-green-100 font-bold'
                                    : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                            }`}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                handleVote("UPVOTE");
                            }}>
                            <span className={`text-lg group-hover:scale-110 transition-transform ${
                                myVoteType === "UPVOTE" ? 'scale-110' : ''
                            }`}>👍</span>
                            <span className="font-semibold">{post.upvoteCount || 0}</span>
                        </button>
                        {/* 비추천 버튼 */}
                        <button
                            className={`flex items-center space-x-2 transition-all duration-200 group px-3 py-1.5 rounded-lg ${
                                myVoteType === "DOWNVOTE"
                                    ? 'text-red-700 bg-red-100 font-bold'
                                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                handleVote("DOWNVOTE")
                            }}>
                            <span className={`text-lg group-hover:scale-110 transition-transform ${
                                myVoteType === "DOWNVOTE" ? 'scale-110' : ''
                            }`}>👎</span>
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
            <CommentCard isExpanded={isExpanded} post={post}></CommentCard>
        </article>
    );
}