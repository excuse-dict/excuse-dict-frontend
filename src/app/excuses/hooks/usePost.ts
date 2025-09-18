import {useEffect, useState} from "react";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {useAuthState} from "@/app/login/auth/useAuthState";

export const usePost = (initialPost: PostInterface) => {

    const [post, setPost] = useState<PostInterface>(initialPost);

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

    const lowerCommentCount = () => {
        setPost(prev => ({
            ...prev,
            commentCount: prev.commentCount - 1,
        }));
    }

    return {
        post, setPost,
        upvote, cancelUpvote,
        downvote, cancelDownvote,
        lowerCommentCount,
    };
}