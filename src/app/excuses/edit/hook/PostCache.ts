import { create } from 'zustand';
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";

interface PostCache {
    cachedPost: PostInterface | null;
    setCachedPost: (post: PostInterface | null) => void;
    clearCurrentPost: () => void;
}

export const usePostCache = create<PostCache>((set) => ({
    cachedPost: null,
    setCachedPost: (post) => set({ cachedPost: post }),
    clearCurrentPost: () => set({ cachedPost: null }),
}));