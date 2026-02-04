import {SearchType, SearchTypeKey, useSearch} from "@/global_components/search/useSearch";
import {useEffect} from "react";
import {useHotKeywords} from "@/global_components/search/useHotKeywords";
import SearchKeywordContainer from "@/global_components/search/SearchKeywordContainer";
import {handleKeyDown} from "@/lib/KeyDownHelper";

export default function SearchInputContainer({searchHook, keywordHook, requestHandler}:{
    searchHook: ReturnType<typeof useSearch>,
    keywordHook: ReturnType<typeof useHotKeywords>
    requestHandler: () => void,
}){

    const { searchInput, setSearchInput, currentSearchType, setCurrentSearchType } = searchHook;

    const { setIsFocused, containerRef } = keywordHook;

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex">
                <select
                    className="outline-none text-center bg-white border-r-2 border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors"
                    value={currentSearchType}
                    onChange={(e) => setCurrentSearchType(e.target.value as SearchTypeKey)}
                >
                    {Object.values(SearchType).map(type => (
                        <option key={type.key} value={type.key}>
                            {type.displayName}
                        </option>
                    ))}
                </select>
                <input
                    className="flex-1 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset"
                    placeholder="검색어를 입력하세요"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={(e) => handleKeyDown(e, "Enter", requestHandler)}
                />
                <button
                    className="px-6 py-2 bg-purple-400 hover:bg-purple-500 text-white text-xl transition-colors"
                    onClick={requestHandler}
                >
                    🔎︎
                </button>
            </div>
            {/* 검색어 드롭다운 */}
            <SearchKeywordContainer
                searchHook={searchHook}
                keywordHook={keywordHook}
            ></SearchKeywordContainer>
        </div>
    );
}
