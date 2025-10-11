import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import PostCarouselCard from "@/global_components/carousel/PostCarouselCard";
import LoadingCarouselCard from "@/global_components/carousel/LoadingCarouselCard";

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

    return (
        <div className="flex overflow-x-scroll w-full mt-2 mb-2 justify-between">
            {isLoading ? (
                // 로딩 중일 때는 플레이스홀더
                [...Array(5)].map((_, index) => (
                    <LoadingCarouselCard key={index}/>
                ))
            ) : (
                // 로딩 끝나면 실제 데이터
                posts.map((post) => {
                    switch (postType){
                        case "POST":
                            return <PostCarouselCard post={post} key={post.postId} />
                        case "WEEKLY_TOP":
                            return <PostCarouselCard post={post} key={post.postId} />
                        case "HALL_OF_FAME":
                            return <PostCarouselCard post={post} key={post.postId} />
                        default:
                            return <PostCarouselCard post={post} key={post.postId} />
                    }
                })
            )}
        </div>
    );
}