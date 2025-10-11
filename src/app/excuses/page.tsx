'use client';

import {useEffect, useState} from 'react';
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_POST} from "@/app/constants/constants";
import {usePage} from "@/global_components/page/usePage";
import PostCard from "@/app/excuses/posts/components/PostCard";
import PageContainer from "@/global_components/page/PageContainer";
import {ReplyProvider} from "@/app/excuses/contexts/ReplyContext";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import Searcher from "@/global_components/search/Searcher";
import {useSearch} from "@/global_components/search/useSearch";
import {apiPost} from "@/axios/requests/post/apiPost";
import {useTagFilter} from "@/global_components/search/useTagFilter";

export default function Board() {
    const pageHook = usePage();
    const {currentPage, setPageInfo} = pageHook;

    const [isLoading, setLoading] = useState(true);

    const postsHook = usePosts();
    const { posts, setPosts } = postsHook;

    const searchHook = useSearch();
    const { searchInput, currentSearchType, setLatestSearchType } = searchHook;

    const tagFilterHook = useTagFilter();
    const { includedTagKeys, excludedTagKeys } = tagFilterHook;

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
            }
        })
    }

    useEffect(() => {
        sendGetPostsRequest();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto flex items-center justify-center p-4 min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">게시물을 불러오는 중...</p>
                </div>
            </div>
        );
    }

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
                    {posts.map((post, index) => (
                        <ReplyProvider key={index}>
                            <PostCard postProp={post} postsHook={postsHook} searchHook={searchHook}></PostCard>
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