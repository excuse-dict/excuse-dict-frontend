import {useEffect, useState} from "react";
import {Post} from "@/app/excuses/interfaces/PostInterface";

export const usePost = (initialPost: Post) => {

    const [post, setPost] = useState<Post>(initialPost);

    const upvote = () => {
        setPost(prev => ({
            ...prev,
            upvoteCount: prev.upvoteCount + 1
        }));
    }

    const cancelUpvote = () => {
        setPost(prev => ({
            ...prev,
            upvoteCount: prev.upvoteCount - 1
        }));
    }

    const downvote = () => {
        setPost(prev => ({
            ...prev,
            downvoteCount: prev.downvoteCount + 1
        }));
    }

    const cancelDownvote = () => {
        setPost(prev => ({
            ...prev,
            downvoteCount: prev.downvoteCount - 1
        }));
    }

    return {
        post, setPost,
        upvote, cancelUpvote,
        downvote, cancelDownvote
    };
}