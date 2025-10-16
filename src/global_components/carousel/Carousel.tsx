import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import PostCarouselCard from "@/global_components/carousel/PostCarouselCard";
import LoadingCarouselCard from "@/global_components/carousel/LoadingCarouselCard";
import {PG_EXCUSES, PG_HALL_OF_FAME, PG_WEEKLY_TOP} from "@/app/constants/constants";

export type PostType = 'POST' | 'WEEKLY_TOP' | 'HALL_OF_FAME';

export default function Carousel<T extends PostInterface>({
                                                              posts,
                                                              postType,
                                                              isLoading = false
                                                          }: {
    posts: Array<T>,
    postType: PostType,
    isLoading?: boolean
}){

    const getPostBoardUrl = (postType: PostType) => {
        switch (postType){
            case "POST":
                return PG_EXCUSES;
            case "WEEKLY_TOP":
                return PG_WEEKLY_TOP
            case "HALL_OF_FAME":
                return PG_HALL_OF_FAME;
            default:
                return PG_EXCUSES;
        }
    }

    return (
        <div className="flex overflow-x-scroll w-full mt-2 mb-2 justify-between">
            {isLoading ? (
                // 로딩 중일 때는 플레이스홀더
                [...Array(5)].map((_, index) => (
                    <LoadingCarouselCard key={index}/>
                ))
            ) : (
                // 로딩 끝나면 실제 데이터
                posts.map((post) =>  <PostCarouselCard post={post} key={post.postId} url={getPostBoardUrl(postType)} />)
            )}
        </div>
    );
}