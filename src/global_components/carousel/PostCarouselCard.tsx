import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import css from "./carousel.module.css";
import {WeeklyTopPostInterface} from "@/app/weekly-top/interface/WeeklyTopPostInterface";
import {HallOfFamePostInterface} from "@/app/hall-of-fame/interface/HallOfFamePostInterface";
import {useRouter} from "next/navigation";

export default function PostCarouselCard<T extends PostInterface>({ post, url }: {
    post: T,
    url: string,
}){

    const router = useRouter();

    function isWeeklyTop(post: PostInterface): post is WeeklyTopPostInterface {
        return 'hotScore' in post;
    }

    function isHallOfFame(post: PostInterface): post is HallOfFamePostInterface {
        return 'rank' in post;
    }

    const handleNavigate = (postId: number) => {
        router.push(url + `?highlight=${postId}`);
    }

    return (
        <div
            className={css.card}
            onClick={() => handleNavigate(post.postId)}
        >
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
