'use client';

import {Suspense, useEffect, useState} from 'react';
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_POST, EP_POST_HIGHLIGHTED} from "@/app/constants/constants";
import {usePage} from "@/global_components/page/usePage";
import PostCard from "@/app/excuses/posts/components/PostCard";
import PageContainer from "@/global_components/page/PageContainer";
import {ReplyProvider} from "@/app/excuses/contexts/ReplyContext";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import Searcher from "@/global_components/search/Searcher";
import {useSearch} from "@/global_components/search/useSearch";
import {apiPost} from "@/axios/requests/post/apiPost";
import {useTagFilter} from "@/global_components/search/useTagFilter";
import {useSearchParams} from "next/navigation";
import {useHighlightPost} from "@/app/excuses/hooks/useHighlightPost";
import {toast} from "react-toastify";

const BoardContent = () => {
    const searchParams = useSearchParams();

    const pageHook = usePage();
    const {currentPage, setPageInfo} = pageHook;

    const [isLoading, setLoading] = useState(true);

    const postsHook = usePosts();
    const { posts, setPosts } = postsHook;

    const searchHook = useSearch();
    const { searchInput, currentSearchType, setLatestSearchType } = searchHook;

    const tagFilterHook = useTagFilter();
    const { includedTagKeys, excludedTagKeys } = tagFilterHook;

    const { highlightedId, setHighlightedId, postRefs, highlightClassName } = useHighlightPost();

    const sendGetPostsRequest = () => {
        setLoading(true);
        apiPost({
            endPoint: EP_POST + "/search",
            body: {
                page: currentPage,
                searchInput: searchInput,
                searchType: currentSearchType,
                includedTags: includedTagKeys,
                excludedTags: excludedTagKeys
            },
            onSuccess: (response) => {
                setPosts(response?.data?.data?.page?.content);
                setPageInfo(response?.data?.data?.pageInfo);
                setLoading(false);
                setLatestSearchType(currentSearchType);

                setHighlightedId(null);
            }
        })
    }

    // 하이라이트 게시물 지정 쿼리 파라미터 제거
    const clearHighlightQueryParam = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('highlight');
        window.history.replaceState({}, '', url.toString());
    }

    const sendGetHighlightedPostPage = (postId: number) => {
        setLoading(true);
        apiGet({
            endPoint: EP_POST_HIGHLIGHTED(postId),
            onSuccess: (response) => {
                setPosts(response?.data?.data?.page?.content);
                setPageInfo(response?.data?.data?.pageInfo);
                setLoading(false);

                setHighlightedId(postId);

            },
            onFail: (error) => {
                setLoading(false);
                if(error.response.data.code == 'POST_NOT_FOUND'){
                    toast("해당 게시물을 찾을 수 없어 전체 게시물을 조회합니다.");

                    sendGetPostsRequest();
                }
            }
        });
    }

    // 페이지 마운트 시 하이라이트 실행
    useEffect(() => {
        const highlightId = searchParams.get('highlight');

        if(highlightId){
            const highlightIdNumber = parseInt(highlightId);
            sendGetHighlightedPostPage(highlightIdNumber);

            // 쿼리 파라미터 제거
            clearHighlightQueryParam();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 일반 검색은 페이지 변경 시마다
    useEffect(() => {
        const highlightId = searchParams.get('highlight');

        // 최초 1회 (하이라이트 파라미터가)있을 땐 스킵
        if(highlightId) return;

        // 일반 조회 api 호출
        sendGetPostsRequest();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <div className="flex mx-auto w-[45%]">
            <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">변명 게시판</h1>
                    <p className="text-gray-600">다양한 변명들을 살펴보세요</p>
                </div>

                <div className="mt-8"></div>

                {/* 게시물 없음 */}
                {posts.length === 0 && !isLoading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">게시물이 없습니다</h3>
                        <p className="text-gray-500">첫 번째 게시물을 작성해보세요!</p>
                    </div>
                )}

                {/* 게시물 목록 */}
                <div className="space-y-6 mb-8">
                    {posts.map((post) => (
                        <ReplyProvider key={post.postId}>
                            <div
                                ref={el => { postRefs.current[post.postId] = el; }}
                                className={`transition-all duration-500 ${highlightedId === post.postId ? highlightClassName : ''}`}
                            >
                                <PostCard postProp={post} postsHook={postsHook} searchHook={searchHook} />
                            </div>
                        </ReplyProvider>
                    ))}
                </div>

                {/* 페이지네이션 */}
                <PageContainer page={pageHook}></PageContainer>
            </div>
            {/*검색 & 필터*/}
            <Searcher
                requestHandler={sendGetPostsRequest}
                searchHook={searchHook}
                tagFilterHook={tagFilterHook}
            ></Searcher>
        </div>
    );
}

export default function Board() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-4xl mx-auto flex items-center justify-center p-4 min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">게시물을 불러오는 중...</p>
                </div>
            </div>
        }>
            <BoardContent />
        </Suspense>
    );
}