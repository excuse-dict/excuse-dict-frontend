import {useEffect, useRef, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_HOT_KEYWORDS, EP_OVERVIEW, LS_RECENT_SEARCHES} from "@/app/constants/constants";
import {useSearch} from "@/global_components/search/useSearch";
import {string} from "postcss-selector-parser";

export interface HotKeyword {
    keyword: string;
    count: number;
}

export const useHotKeywords = () => {

    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hotKeywords, setHotKeywords] = useState<HotKeyword[]>([]);

    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const removeRecentSearch = (index: number) => {};
    const clearRecentSearches = () => {};

    const addRecentSearch = (keyword: string) => {

        if(keyword.trim().length === 0) return;

        setRecentSearches(prev => {
            const filtered = prev.filter(k => k !== keyword);
            return [keyword, ...filtered];
        })
    }

    useEffect(() => {
        if(!isFocused) return;
        if(hotKeywords.length > 0) return;

        apiGet({
            endPoint: EP_HOT_KEYWORDS,
            onSuccess: (response) => setHotKeywords(response.data.data.list)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    useEffect(() => {
        const storedRecentSearches = localStorage.getItem(LS_RECENT_SEARCHES);
        const parsedRecentSearches: string[] = storedRecentSearches ? JSON.parse(storedRecentSearches) : [];
        setRecentSearches(parsedRecentSearches);
    }, []);

    return {
        isFocused, setIsFocused,
        containerRef,
        hotKeywords,
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches
    }
}
