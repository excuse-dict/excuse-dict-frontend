'use client';

import {usePage} from "@/global_components/page/usePage";
import {useEffect} from "react";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_WEEKLY_TOP} from "@/app/constants/constants";
import WeeklyTopPost from "@/app/weekly-top/components/WeeklyTopPost";
import {WeeklyTopPostInterface} from "@/app/weekly-top/interface/WeeklyTopPostInterface";

export default function WeeklyTopPage(){

    const postsHook = usePosts<WeeklyTopPostInterface>();
    const { posts, setPosts } = postsHook;

    const { currentPage } = usePage();

    useEffect(() => {
        apiGet({
            endPoint: EP_WEEKLY_TOP,
            onSuccess: (response) => setPosts(response?.data?.data?.page?.content)
        })
    }, [currentPage]);

    return(
        <div className="w-1/2 m-auto p-12 rounded">
            <p className="font-bold text-4xl">주간 TOP</p>
            <p className="font-light mt-4">최근 떠오르는 핑계들을 둘러보세요</p>
            <div className="bg-white">
                {posts.map((post, index) => (
                    <div className="flex" key={post.postId}>
                        <WeeklyTopPost postProp={post} postsHook={postsHook}></WeeklyTopPost>
                    </div>
                ))}
            </div>
        </div>
    );
}