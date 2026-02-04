import {useEffect, useRef, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_HOT_KEYWORDS, EP_OVERVIEW} from "@/app/constants/constants";

export interface HotKeyword {
    keyword: string;
    count: number;
}

export const useHotKeywords = () => {

    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hotKeywords, setHotKeywords] = useState<HotKeyword[]>([]);

    useEffect(() => {
        if(!isFocused) return;
        if(hotKeywords.length > 0) return;

        apiGet({
            endPoint: EP_HOT_KEYWORDS,
            onSuccess: (response) => setHotKeywords(response.data.data.list)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return {
        isFocused, setIsFocused,
        containerRef,
        hotKeywords
    }
}
