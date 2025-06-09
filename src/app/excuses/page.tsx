'use client';

import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_POST} from "@/app/constants/constants";
import {usePage} from "@/global_components/page/usePage";
import {useEffect, useState} from "react";

export default function Board(){

    const { currentPage } = usePage();

    const [posts, setPosts] = useState<Array<Object>>([]);

    const getPosts = () => {
        apiGet({
            endPoint: EP_POST,
            params: {
                page: currentPage,
            },
            onSuccess: (response) => setPosts(response?.data?.data?.page?.content),
        })
    }

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    return(
        <div className={'global_container'}>

        </div>
    );
}