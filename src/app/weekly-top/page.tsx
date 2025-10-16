'use client';

import {usePage} from "@/global_components/page/usePage";
import {Suspense, useEffect} from "react";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_WEEKLY_TOP} from "@/app/constants/constants";
import WeeklyTopPost from "@/app/weekly-top/components/WeeklyTopPost";
import {WeeklyTopPostInterface} from "@/app/weekly-top/interface/WeeklyTopPostInterface";
import {useSearchParams} from "next/navigation";
import {usePostHighlight} from "@/app/excuses/hooks/usePostHighlight";

export default function WeeklyTopPage(){

    const postsHook = usePosts<WeeklyTopPostInterface>();
    const { posts, setPosts } = postsHook;

    const { currentPage } = usePage();

    const searchParams = useSearchParams();

    const {
        highlightedId,
        setHighlightedId,
        postRefs,
        highlightClassName,
        clearHighlightQueryParam,
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
        apiGet({
            endPoint: EP_WEEKLY_TOP,
            onSuccess: (response) => {
                setPosts(response?.data?.data?.page?.content);

                highlightPost();
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return(
        <div className="w-1/2 m-auto p-12 rounded">
            <p className="font-bold text-4xl">주간 TOP</p>
            <p className="font-light mt-4">최근 떠오르는 핑계들을 둘러보세요</p>
            <div className="bg-white">
                {posts.map((post) => (
                    <div
                        className={`flex ${highlightedId === post.postId ? highlightClassName : ''}`}
                        key={post.postId}
                        ref={el => { postRefs.current[post.postId] = el; }}
                    >
                        <WeeklyTopPost postProp={post} postsHook={postsHook}/>
                    </div>
                ))}
            </div>
        </div>
    );
}