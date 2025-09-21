import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {useAuthState} from "@/app/login/auth/useAuthState";
import React, {useState} from "react";
import CommentCard from "@/app/excuses/comments/components/CommentCard";
import {usePostState} from "@/app/excuses/hooks/usePostState";
import VoteButton from "@/app/excuses/components/VoteButton";
import {useRouter} from "next/navigation";
import {usePostCache} from "@/app/excuses/edit/hook/PostCache";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {apiDelete} from "@/axios/requests/delete/apiDelete";
import {EP_UPDATE_OR_DELETE_POST} from "@/app/constants/constants";
import AuthorInfo from "@/app/excuses/posts/components/AuthorInfo";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {usePosts} from "@/app/excuses/hooks/usePosts";

export default function PostCard({ postProp, postsHook }: {
    postProp: PostInterface,
    postsHook: ReturnType<typeof usePosts>,
}) {

    // 전달받은 객체가 아니라 훅의 post를 써야 함 (props는 상태 관리 까다로움)
    const postStateHook = usePostState(postProp);
    const { post } = postStateHook;

    const { deletePost } = postsHook;

    const postCacheHook = usePostCache(); // 수정 버튼 누를 시 수정 페이지로 넘길 캐시 데이터 저장소

    const authState = useAuthState();
    const router = useRouter();

    const {memberId} = authState;
    const [isExpanded, setExpanded] = useState(false);

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
                <div className="flex items-center justify-between mb-4">
                    {/* 작성자 정보 */}
                    <AuthorInfo post={post}></AuthorInfo>
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
                        <VoteButton postState={postStateHook} voteType={"UPVOTE"}></VoteButton>
                        {/* 비추천 버튼 */}
                        <VoteButton postState={postStateHook} voteType={"DOWNVOTE"}></VoteButton>
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
                        {post.excuse.tags.map((tag: TagInterface, index: number) => {
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
            <CommentCard isExpanded={isExpanded} postHook={postStateHook}></CommentCard>
        </article>
    );
}