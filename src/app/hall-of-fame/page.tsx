'use client';

import {usePage} from "@/global_components/page/usePage";
import {Suspense, useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_HALL_OF_FAME} from "@/app/constants/constants";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import HallOfFamePost from "@/app/excuses/posts/components/HallOfFamePost";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import {HallOfFamePostInterface} from "@/app/hall-of-fame/interface/HallOfFamePostInterface";
import {usePostHighlight} from "@/app/excuses/hooks/usePostHighlight";
import {useSearchParams} from "next/navigation";
import LoadingSpinner from "@/app/excuses/components/LoadingSpinner";
import NoPosts from "@/app/excuses/components/NoPosts";


const HallOfFameContent = () => {
    const { posts, setPosts } = usePosts<HallOfFamePostInterface>();
    const { currentPage } = usePage();

    const [isLoading, setLoading] = useState(true);

    const searchParams = useSearchParams();

    const {
        highlightedId,
        setHighlightedId,
        postRefs,
        highlightClassName,
        clearHighlightQueryParam
    } = usePostHighlight();

    const highlightPost = () => {
        const highlightId = searchParams.get('highlight');

        if(highlightId){
            const highlightIdNumber = parseInt(highlightId);

            setHighlightedId(highlightIdNumber);
            clearHighlightQueryParam();
        }
    }

    useEffect(() => {
        setLoading(true);
        apiGet({
            endPoint: EP_HALL_OF_FAME,
            onSuccess: (response) => {
                setLoading(false);
                setPosts(response.data.data.page.content.map(
                    (post: PostInterface, index: number) => ({
                        ...post,
                        rank: index + 1,
                    } as HallOfFamePostInterface)
                ));

                highlightPost();
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    if(isLoading) return <LoadingSpinner/>;

    if(posts.length === 0) return <NoPosts/>;

    return (
        <div className="w-1/2 m-auto p-12 rounded">
            <p className="font-bold text-4xl">명예의 전당</p>
            <p className="font-light mt-4">레전드 미꾸라지 뱀장어들</p>
            <div className="bg-white">
                {posts.map((post) => (
                    <div
                        className={`flex transition-all ${highlightedId === post.postId ? highlightClassName : ''}`}
                        key={post.postId}
                        ref={el => { postRefs.current[post.postId] = el }}
                    >
                        <HallOfFamePost postProp={post}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HallOfFamePage(){

    return (
        <Suspense
            fallback={<div/>}
        >
            <HallOfFameContent/>
        </Suspense>
    );
}