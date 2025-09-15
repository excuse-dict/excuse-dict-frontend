import {PostInterface} from "@/app/excuses/posts/PostInterface";
import {getDatetimeFormat} from "@/lib/TimeHelper";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {useState} from "react";
import CommentCard from "@/app/excuses/comments/components/CommentCard";
import {usePost} from "@/app/excuses/hooks/usePost";
import VoteButton from "@/app/excuses/components/VoteButton";
import {useRouter} from "next/navigation";
import {usePostCache} from "@/app/excuses/edit/hook/PostCache";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {apiDelete} from "@/axios/requests/delete/apiDelete";
import {EP_UPDATE_OR_DELETE_POST} from "@/app/constants/constants";

export default function PostCard({ postProp, deletePost }: {
    postProp: PostInterface,
    deletePost: (postId: number) => void,
}) {

    // 전달받은 객체가 아니라 훅의 post를 써야 함 (props는 상태 관리 까다로움)
    const postHook = usePost(postProp);
    const { post } = postHook;

    const postCacheHook = usePostCache(); // 수정 버튼 누를 시 수정 페이지로 넘길 캐시 데이터 저장소

    const authState = useAuthState();
    const router = useRouter();

    const {memberId} = authState;
    const [isExpanded, setExpanded] = useState<boolean>(false);

    const isMine = (): boolean => {
        return post.author.id === memberId;
    }

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        // 버튼이나 입력 필드 클릭시에는 카드 확장 방지
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
            return;
        }
        setExpanded(!isExpanded);
    }

    const handleEditPost = () => {
        postCacheHook.setCachedPost(post);
        router.push("/excuses/edit")
    }

    const handleDeletePost = () => {
        Swal.fire({
            title: "확인",
            text: "게시물을 삭제하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            heightAuto: false,
        }).then(() => {
            apiDelete({
                endPoint: EP_UPDATE_OR_DELETE_POST(post.postId),
                onSuccess: () => {
                    toast("게시물이 삭제되었습니다.");
                    deletePost(post.postId);
                }
            })
        })
    }

    if(!post) return <></>;

    return (
        <article
            className={`global_button !cursor-default !bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 ${
                isExpanded ? 'shadow-xl' : ''
            }`}
        >
            {/*상단 섹션*/}
            <section
                className={'flex flex-col cursor-pointer'}
                onClick={handleCardClick}
            >
                {/* 작성자 정보 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {/*프로필 아이콘*/}
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {post.author.nickname?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                            {/*작성자 닉네임*/}
                            <p className={`font-semibold ${isMine() ? 'text-[var(--strong-purple)]' : 'text-gray-800'}`}>
                                {post.author.nickname || '익명'}
                            </p>
                            {/*작성일시*/}
                            <p className="text-sm text-gray-500">
                                {`${getDatetimeFormat(post.createdAt)}${post.createdAt !== post.modifiedAt ? ' (수정됨)' : ''}`}
                            </p>
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
                {post.author?.id !== memberId ? <></> :
                    <div className="flex mt-2 gap-4 ml-auto">
                        <button
                            className="!bg-transparent !text-blue-400 text-sm"
                            onClick={handleEditPost}
                        >✏️수정</button>
                        <button
                            className="!bg-transparent !text-red-400 text-sm"
                            onClick={handleDeletePost}
                        >🗑️삭제</button>
                    </div>
                }
            </section>

            {/* 댓글 섹션 - 확장될 때만 표시 */}
            <CommentCard isExpanded={isExpanded} postHook={postHook}></CommentCard>
        </article>
    );
}