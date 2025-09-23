import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import PostCarouselCard from "@/global_components/carousel/PostCarouselCard";

export type PostType = 'POST' | 'WEEKLY_TOP' | 'HALL_OF_FAME';

export default function Carousel<T extends PostInterface>({ posts, postType }: {
    posts: Array<T>,
    postType: PostType,
}){
    return (
        <div className="flex overflow-x-scroll w-full mt-2 mb-2 justify-between">
            {posts.map((post) => {
                switch (postType){
                    case "POST":
                        return <PostCarouselCard post={post} postType={'POST'} key={post.postId} />
                    case "WEEKLY_TOP":
                        return <PostCarouselCard post={post} postType={'WEEKLY_TOP'} key={post.postId} />
                    case "HALL_OF_FAME":
                        return <PostCarouselCard post={post} postType={'HALL_OF_FAME'} key={post.postId} />
                    default:
                        return <PostCarouselCard post={post} postType={'POST'} key={post.postId} />
                }
            })}
        </div>
    );
}
