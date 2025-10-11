'use client';

import css from './page.module.css'
import {useRouter} from "next/navigation";
import {EP_OVERVIEW, PG_EXCUSES, PG_HALL_OF_FAME, PG_NEW_EXCUSE, PG_WEEKLY_TOP} from "@/app/constants/constants";
import {useAuthGuard} from "@/app/login/auth/useAuthGuard";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {usePosts} from "@/app/excuses/hooks/usePosts";
import Carousel from "@/global_components/carousel/Carousel";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {WeeklyTopPostInterface} from "@/app/weekly-top/interface/WeeklyTopPostInterface";
import {HallOfFamePostInterface} from "@/app/hall-of-fame/interface/HallOfFamePostInterface";

export default function Home() {

    const contentWidth = 'w-4/5';

    const router = useRouter();
    const { confirmLogin } = useAuthGuard();

    const [isPostsLoading, setPostsLoading] = useState(true);
    const { posts: recentPosts, setPosts: setRecentPosts, } = usePosts<PostInterface>();
    const { posts: weeklyPosts, setPosts: setWeeklyPosts } = usePosts<WeeklyTopPostInterface>();
    const { posts: hofPosts, setPosts: setHofPosts } = usePosts<HallOfFamePostInterface>();

    useEffect(() => {
        apiGet({
            endPoint: EP_OVERVIEW,
            onSuccess: (response) => {
                setRecentPosts(response?.data?.data?.recentPosts?.content);
                setWeeklyPosts(response?.data?.data?.weeklyTopPosts?.content);
                setHofPosts(response?.data?.data?.hallOfFamePosts?.content.map(
                    (post: PostInterface, index: number) => ({
                        ...post,
                        rank: index + 1
                    })
                ));

                setPostsLoading(false);
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleWritePost = () => {
        if(confirmLogin("게시글을 작성하려면 로그인해주세요")) router.push(PG_NEW_EXCUSE);
    }

    return (
        <div className={`global_container ${contentWidth}`}>
            <header className={`flex ${contentWidth} mb-4`}>
                <button
                    className='global_button bg-[--strong-purple-light] ml-auto w-16 h-8 text-sm rounded-md'
                    onClick={handleWritePost}
                >+글쓰기</button>
            </header>
            <section className={`${css.section} ${contentWidth}`}>
                <header className={css.section_header}>
                    <h3>최신글</h3>
                    <button
                        className={css.more_button}
                        onClick={() => router.push(PG_EXCUSES)}
                    >+ 더보기</button>
                </header>
                <Carousel posts={recentPosts} postType={'POST'} isLoading={isPostsLoading}></Carousel>
            </section>
            <section className={`${css.section} ${contentWidth}`}>
                <header className={css.section_header}>
                    <h3>주간 TOP</h3>
                    <button
                        className={css.more_button}
                        onClick={() => router.push(PG_WEEKLY_TOP)}
                    >+ 더보기</button>
                </header>
                <Carousel posts={weeklyPosts} postType={'WEEKLY_TOP'} isLoading={isPostsLoading}></Carousel>
            </section>
            <section className={`${css.section} ${contentWidth}`}>
                <header className={css.section_header}>
                    <h3>명예의 전당</h3>
                    <button
                        className={css.more_button}
                        onClick={() => router.push(PG_HALL_OF_FAME)}
                    >+ 더보기</button>
                </header>
                <Carousel posts={hofPosts} postType={'HALL_OF_FAME'} isLoading={isPostsLoading}></Carousel>
            </section>
        </div>
    );
}
