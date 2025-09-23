import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import css from "./carousel.module.css";
import {PostType} from "@/global_components/carousel/Carousel";
import {WeeklyTopPostInterface} from "@/app/weekly-top/interface/WeeklyTopPostInterface";
import {HallOfFamePostInterface} from "@/app/hall-of-fame/interface/HallOfFamePostInterface";

export default function PostCarouselCard<T extends PostInterface>({ post, postType }: {
    post: T,
    postType: PostType,
}){

    function isWeeklyTop(post: PostInterface): post is WeeklyTopPostInterface {
        return 'hotScore' in post;
    }

    function isHallOfFame(post: PostInterface): post is HallOfFamePostInterface {
        return 'rank' in post;
    }

    return (
        <div className={css.card}>
            <div className={css.content}>
                <p className={css.situation}>{post.excuse.situation}</p>
                <p className={css.excuse}>{post.excuse.excuse}</p>
            </div>
            <div className={css.stats}>
                <span>👍 {post.upvoteCount || 0}</span>
                <span>💬 {post.commentCount || 0}</span>
                {isWeeklyTop(post) && (
                    <span className="ml-auto">🔥 {post.hotScore}</span>
                )}
                {isHallOfFame(post) && (
                    <span className="ml-auto">🏆 {post.rank}</span>
                )}
            </div>
        </div>
    );
}
