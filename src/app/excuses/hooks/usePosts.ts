import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {useState} from "react";

export const usePosts = <T extends PostInterface>() => {

    const [posts, setPosts] = useState<T[]>([]);

    const deletePost = (postId: number) => {
        setPosts(posts => {
            const index = posts.findIndex(post => post.postId === postId);

            if (index === -1) return posts; // 못 찾으면 원본 그대로

            return [
                ...posts.slice(0, index),
                ...posts.slice(index + 1)
            ];
        });
    }

    return {
        posts, setPosts,
        deletePost,
    }
}