import {useState} from "react";

export const SearchType = {
    SITUATION_AND_EXCUSE: { key: "SITUATION_AND_EXCUSE" as const, displayName: '제목 + 내용' },
    SITUATION: { key: "SITUATION" as const, displayName: '제목' },
    EXCUSE: { key: "EXCUSE" as const, displayName: '내용' },
    AUTHOR: { key: "AUTHOR" as const, displayName: '작성자' },
} as const;

export type SearchTypeKey = typeof SearchType[keyof typeof SearchType]['key'];

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState('');
    const [currentSearchType, setCurrentSearchType] = useState<SearchTypeKey>(SearchType.SITUATION_AND_EXCUSE.key);
    const [latestSearchType, setLatestSearchType] = useState<SearchTypeKey | null>(null);

    return {
        searchInput, setSearchInput,
        currentSearchType, setCurrentSearchType,
        latestSearchType, setLatestSearchType
    }
}
