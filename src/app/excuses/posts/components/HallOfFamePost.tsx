import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import VoteButton from "@/app/excuses/components/VoteButton";
import CommentCard from "@/app/excuses/comments/components/CommentCard";
import AuthorInfo from "@/app/excuses/posts/components/AuthorInfo";
import {useState} from "react";
import {usePost} from "@/app/excuses/hooks/usePost";

export default function HallOfFamePost({postProp, ranking}: {
    postProp: PostInterface,
    ranking: number
}) {

    // 전달받은 객체가 아니라 훅의 post를 써야 함 (props는 상태 관리 까다로움)
    const postHook = usePost(postProp);
    const {post} = postHook;
    const [isExpanded, setExpanded] = useState(false);

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        // 버튼이나 입력 필드 클릭시에는 카드 확장 방지
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
            return;
        }
        setExpanded(!isExpanded);
    }

    const getMedal = (ranking: number) => {
        switch (ranking) {
            case 1:
                return '🥇'
            case 2:
                return '🥈'
            case 3:
                return '🥉'
            default:
                return '#'
        }
    }

    const getLabelColor = (ranking: number) => {
        switch (ranking) {
            case 1:
                return 'bg-amber-400'
            case 2:
                return 'bg-gray-400'
            case 3:
                return 'bg-[#CE8946]'
            default:
                return 'bg-blue-400'
        }
    }

    const getMedalBg = (ranking: number) => {
        switch (ranking) {
            case 1:
                return 'bg-gradient-to-b from-yellow-100 to-yellow-200 border-yellow-500' // 금메달
            case 2:
                return 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-500' // 은메달
            case 3:
                return 'bg-gradient-to-b from-orange-100 to-orange-200 border-orange-600' // 동메달
            default:
                return 'bg-slate-100 border-slate-400' // 기본
        }
    }

    return (
        <div className="flex w-full">
            {/*순위 라벨*/}
            <div className={`flex flex-col h-full items-center ${getLabelColor(ranking)}`}>
                <div className="flex-1 flex w-full items-start justify-center">
                    <p className={`text-xl w-full text-center mt-1 border-t-4 border-b-4 ${getMedalBg(ranking)}`}>
                        {getMedal(ranking)}
                    </p>
                </div>
                <div className="flex-1 flex p-2 justify-center">
                    <p className="font-bold text-xl">{`#${ranking}`}</p>
                </div>
            </div>
            <article
                className={`flex-1 p-8 !cursor-default !bg-white shadow-md hover:shadow-lg transition-all duration-300 ${
                    isExpanded ? 'shadow-xl' : ''
                }`}
            >
                {/*상단 섹션*/}
                <section
                    className={'flex flex-col cursor-pointer'}
                    onClick={handleCardClick}
                >
                    <div className="flex items-center justify-between mb-4">
                        {/* 작성자 정보 */}
                        <AuthorInfo post={post}></AuthorInfo>
                        {/* 확장 상태 표시 아이콘 */}
                        <div
                            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
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
                            <VoteButton postState={postHook} voteType={"UPVOTE"}></VoteButton>
                            {/* 비추천 버튼 */}
                            <VoteButton postState={postHook} voteType={"DOWNVOTE"}></VoteButton>
                            {/*댓글 수*/}
                            <div
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-200 group hover:bg-blue-50 px-3 py-1.5 rounded-lg"
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                                <span className="font-semibold">{post.commentCount}</span>
                            </div>
                        </div>
                        {/*태그*/}
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
                <CommentCard isExpanded={isExpanded} postHook={postHook}></CommentCard>
            </article>
        </div>
    )
}