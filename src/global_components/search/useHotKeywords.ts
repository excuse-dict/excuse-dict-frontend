import {useEffect, useRef, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_HOT_KEYWORDS, EP_OVERVIEW, LS_RECENT_SEARCHES} from "@/app/constants/constants";

export interface HotKeyword {
    keyword: string;
    count: number;
    rankChange: number | null;
}

export const useHotKeywords = () => {

    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hotKeywords, setHotKeywords] = useState<HotKeyword[]>([]);

    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const removeRecentSearch = (index: number) => {

        const updated = recentSearches.filter((_, i) => i !== index);

        localStorage.setItem(LS_RECENT_SEARCHES, JSON.stringify(updated));
        setRecentSearches(updated);
    };
    const clearRecentSearches = () => {
        localStorage.setItem(LS_RECENT_SEARCHES, JSON.stringify([]));
        setRecentSearches([]);
    };

    const addRecentSearch = (keyword: string) => {

        if(keyword.trim().length === 0) return;

        setRecentSearches(prev => {
            const filtered = prev.filter(k => k !== keyword);
            const updated = [keyword, ...filtered];

            localStorage.setItem(LS_RECENT_SEARCHES, JSON.stringify(updated));
            return updated;
        })
    }

    // 포커스 시 서버에 요청
    // TODO: 검색창 누를 때마다 서버에 요청 보내는 게 맞는지?
    useEffect(() => {
        if(!isFocused) return;
        if(hotKeywords.length > 0) return;

        apiGet({
            endPoint: EP_HOT_KEYWORDS,
            onSuccess: (response) => setHotKeywords(response.data.data.list)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 가져오기
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
