import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import VoteButton from "@/app/excuses/components/VoteButton";
import CommentCard from "@/app/excuses/comments/components/CommentCard";
import AuthorInfo from "@/app/excuses/posts/components/AuthorInfo";
import {useState} from "react";
import {usePost} from "@/app/excuses/hooks/usePost";

export default function HallOfFamePost({ postProp, ranking }: {
    postProp: PostInterface,
    ranking: number
}){

    // 전달받은 객체가 아니라 훅의 post를 써야 함 (props는 상태 관리 까다로움)
    const postHook = usePost(postProp);
    const { post } = postHook;
    const [isExpanded, setExpanded] = useState(false);

    const getMedal = (ranking: number) => {
        switch (ranking){
            case 1: return '🥇'
            case 2: return '🥈'
            case 3: return '🥉'
            default: return ''
        }
    }

    const getLabelColor = (ranking: number) =>{
        switch (ranking){
            case 1: return 'border-amber-400'
            case 2: return 'border-gray-400'
            case 3: return '🥉'
            default: return ''
        }
    }

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        // 버튼이나 입력 필드 클릭시에는 카드 확장 방지
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
            return;
        }
        setExpanded(!isExpanded);
    }

    return (
        <div className="relative">
            {/* 메인 콘텐츠 - 잡지 스타일 */}
            <article
                className={`bg-white border-l-8 ${getLabelColor(ranking)} pl-12 pr-8 py-12 cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
                onClick={handleCardClick}
                >

                {/* 번호 */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {/*명예의 전당 번호*/}
                        <p className="text-2xl font-bold text-amber-600 tracking-widest">
                            {`${getMedal(ranking)} #${ranking}`}
                        </p>
                    </div>
                    {/*펼침 상태 표시*/}
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </div>

                {/* 제목 */}
                <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
                    {post.excuse.situation || '제목 없음'}
                </h1>

                {/* 내용 */}
                <blockquote className="text-2xl text-gray-600 font-light leading-relaxed mb-12 pl-8 border-l-2 border-gray-200 italic">
                    {post.excuse.excuse || '내용 없음'}
                </blockquote>

                {/* 하단 정보 */}
                <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-4">
                    <div className="flex items-center space-x-4">
                        <div className="scale-90">
                            <AuthorInfo post={post}></AuthorInfo>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* 투표 */}
                        <div className="flex items-center space-x-2 scale-75">
                            <VoteButton postState={postHook} voteType={"UPVOTE"}></VoteButton>
                            <VoteButton postState={postHook} voteType={"DOWNVOTE"}></VoteButton>
                        </div>

                        {/* 댓글 */}
                        <div className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{post.commentCount}</span>
                        </div>

                        {/* 태그 */}
                        <div className="flex space-x-1">
                            {post.excuse.tags.slice(0, 2).map((tag: any, index: number) => (
                                <span key={index} className="text-gray-300">
                                    #{(tag as { value: string }).value}
                                </span>
                            ))}
                            {post.excuse.tags.length > 2 && (
                                <span className="text-gray-300">+{post.excuse.tags.length - 2}</span>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            {/* 댓글 섹션 */}
            <CommentCard isExpanded={isExpanded} postHook={postHook}></CommentCard>
        </div>
    );
}