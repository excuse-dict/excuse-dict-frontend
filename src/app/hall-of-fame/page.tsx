'use client';

import {usePage} from "@/global_components/page/usePage";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_HALL_OF_FAME} from "@/app/constants/constants";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import PostCard from "@/app/excuses/posts/components/PostCard";
import HallOfFamePost from "@/app/excuses/posts/components/HallOfFamePost";

export default function HallOfFamePage(){

    const [posts, setPosts] = useState<Array<PostInterface>>([]);
    const { currentPage } = usePage();

    useEffect(() => {
        apiGet({
            endPoint: EP_HALL_OF_FAME,
            onSuccess: (response) => {
                setPosts(response.data.data.page.content);
            }
        });
    }, [currentPage]);

    return (
        <div className="w-1/2 m-auto p-12 rounded">
            <p className="font-bold text-4xl">명예의 전당</p>
            <p className="font-light mt-4">레전드 미꾸라지 뱀장어들</p>
            <div className="bg-white">
                {posts.map((post, index) => (
                    <div className="flex" key={post.postId}>

                        <HallOfFamePost
                            postProp={post}
                            ranking={index + 1}
                        ></HallOfFamePost>
                    </div>
                ))}
            </div>
        </div>
    );
}