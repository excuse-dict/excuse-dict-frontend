'use client';

import {useState, useEffect} from 'react';
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_POST} from "@/app/constants/constants";
import {usePage} from "@/global_components/page/usePage";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import PostCard from "@/app/excuses/posts/components/PostCard";
import PageContainer from "@/app/excuses/components/PageContainer";
import {ReplyProvider} from "@/app/excuses/contexts/ReplyContext";

export default function Board() {
    const boardPage = usePage();
    const {currentPage, setPageInfo} = boardPage;
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);
        apiGet({
            endPoint: EP_POST,
            params: {
                page: currentPage
            },
            onSuccess: (reponse) => {
                setPosts(reponse?.data?.data?.page?.content);
                setPageInfo(reponse?.data?.data?.pageInfo);
                setloading(false);
            }
        })
    }, [currentPage]);

    const deletePost = (postId: number) => {
        setPosts(posts => {
            const index = posts.findIndex(post => post.postId === postId);

            if (index === -1) return posts; // 못 찾으면 원본 그대로

            return [
                ...posts.slice(0, index),
                ...posts.slice(index + 1)
            ];
        });
    }

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
        <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">변명 게시판</h1>
                <p className="text-gray-600">다양한 변명들을 살펴보세요</p>
            </div>

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
                        <PostCard postProp={post} deletePost={deletePost}></PostCard>
                    </ReplyProvider>
                ))}
            </div>

            {/* 페이지네이션 */}
            <PageContainer page={boardPage}></PageContainer>
        </div>
    );
}