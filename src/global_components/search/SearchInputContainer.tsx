import {SearchType, SearchTypeKey, useSearch} from "@/global_components/search/useSearch";
import {useEffect, useRef, useState} from "react";
import {useHotKeywords} from "@/global_components/search/useHotKeywords";

export default function SearchInputContainer({searchHook, requestHandler}:{
    searchHook: ReturnType<typeof useSearch>,
    requestHandler: () => void,
}){

    const { searchInput, setSearchInput, currentSearchType, setCurrentSearchType } = searchHook;

    const { isFocused, setIsFocused, containerRef, hotKeywords } = useHotKeywords();

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

    const handlePopularSearchClick = (search: string) => {
        setSearchInput(search);
        //requestHandler();
        setIsFocused(false);
    };

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
                />
                <button
                    className="px-6 py-2 bg-purple-400 hover:bg-purple-500 text-white text-xl transition-colors"
                    onClick={requestHandler}
                >
                    🔎︎
                </button>
            </div>
            {/* 인기 검색어 드롭다운 */}
            {isFocused && hotKeywords.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-lg shadow-lg z-50">
                    <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">🔥 인기 검색어</h3>
                        <ul className="space-y-1">
                            {hotKeywords.map((hotSearch, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between px-3 py-2 hover:bg-purple-50 rounded cursor-pointer transition-colors"
                                    onClick={() => handlePopularSearchClick(hotSearch.keyword)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-purple-500 font-semibold text-sm w-5">{index + 1}</span>
                                        <span className="text-gray-700">{hotSearch.keyword}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">{hotSearch.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
