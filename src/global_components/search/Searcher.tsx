import {SearchType, SearchTypeKey, useSearch} from "@/global_components/search/useSearch";

export default function Searcher({ requestHandler, searchHook }: {
    requestHandler: () => void,
    searchHook: ReturnType<typeof useSearch>,
}){

    const { searchInput, setSearchInput, currentSearchType, setCurrentSearchType } = searchHook;

    return (
        <div className="flex w-full border-2 border-purple-400 rounded-lg overflow-hidden bg-white">
            <select
                className="px-4 py-3 outline-none bg-white border-r-2 border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors"
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
                className="flex-1 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset"
                placeholder="검색어를 입력하세요"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
                className="px-6 py-3 bg-purple-400 hover:bg-purple-500 text-white text-xl transition-colors"
                onClick={requestHandler}
            >
                🔎︎
            </button>
        </div>
    );
}