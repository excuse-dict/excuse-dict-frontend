import {useHotKeywords} from "@/global_components/search/useHotKeywords";
import {useSearch} from "@/global_components/search/useSearch";

export default function SearchKeywordContainer({ searchHook, keywordHook }: {
    searchHook: ReturnType<typeof useSearch>
    keywordHook: ReturnType<typeof useHotKeywords>
}){

    const { setSearchInput } = searchHook;
    const { isFocused, setIsFocused, hotKeywords,
        recentSearches, removeRecentSearch, clearRecentSearches} = keywordHook;

    const shouldDisplay = () => {
        return isFocused && ( hotKeywords.length > 0 || recentSearches.length > 0);
    }

    /*검색어 드롭다운 클릭*/
    const handleKeywordClick = (search: string) => {
        setSearchInput(search);
        setIsFocused(false);
    };

    if(!shouldDisplay()) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-lg shadow-lg z-50">
            {/*인기 검색어*/}
            <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">🔥 인기 검색어</h3>
                <ul className="space-y-1">
                    {hotKeywords.map((hotSearch, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between px-3 py-2 hover:bg-purple-50 rounded cursor-pointer transition-colors"
                            onClick={() => handleKeywordClick(hotSearch.keyword)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-purple-500 font-semibold text-sm w-6 flex-shrink-0">{index + 1}</span>
                                <span className="text-gray-700">{hotSearch.keyword}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{hotSearch.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 나의 최근 검색어*/}
            {recentSearches.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-gray-600">최근 검색어</h3>
                        <button
                            className="text-xs text-gray-400 hover:text-gray-600"
                            onClick={clearRecentSearches}
                        >
                            전체 삭제
                        </button>
                    </div>
                    <ul className="space-y-1">
                        {recentSearches.map((search, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors group"
                            >
                                <div className="flex items-center gap-2 flex-1" onClick={() => handleKeywordClick(search)}>
                                    <span className="w-6 opacity-60">🕐</span>
                                    <span className="text-gray-700">{search}</span>
                                </div>
                                <button
                                    className="text-gray-400 hover:text-red-500 text-xl font-light transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeRecentSearch(index);
                                    }}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
