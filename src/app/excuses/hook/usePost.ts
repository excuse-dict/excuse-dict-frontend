import {useEffect, useState} from "react";
import {Post} from "@/app/excuses/posts/PostInterface";
import {useAuthState} from "@/app/login/auth/useAuthState";

export const usePost = (initialPost: Post) => {

    const [post, setPost] = useState<Post>(initialPost);

    const upvote = () => {
        setPost(prev => ({
            ...prev,
            upvoteCount: prev.upvoteCount + 1,
            myVote: { voteType: "UPVOTE", postId: post.postId, memberId: useAuthState.getState().memberId }
        }));
    }

    const cancelUpvote = () => {
        setPost(prev => ({
            ...prev,
            upvoteCount: prev.upvoteCount - 1,
            myVote: null,
        }));
    }

    const downvote = () => {
        setPost(prev => ({
            ...prev,
            downvoteCount: prev.downvoteCount + 1,
            myVote: { voteType: "DOWNVOTE", postId: post.postId, memberId: useAuthState.getState().memberId }
        }));
    }

    const cancelDownvote = () => {
        setPost(prev => ({
            ...prev,
            downvoteCount: prev.downvoteCount - 1,
            myVote: null,
        }));
    }

    return {
        post, setPost,
        upvote, cancelUpvote,
        downvote, cancelDownvote
    };
}