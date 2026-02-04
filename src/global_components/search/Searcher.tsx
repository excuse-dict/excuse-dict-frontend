import {useSearch} from "@/global_components/search/useSearch";
import SearchInputContainer from "@/global_components/search/SearchInputContainer";
import TagFilter from "@/global_components/search/TagFilter";
import {useTagFilter} from "@/global_components/search/useTagFilter";
import {useHotKeywords} from "@/global_components/search/useHotKeywords";

export default function Searcher({ requestHandler, searchHook, keywordHook, tagFilterHook }: {
    requestHandler: () => void,
    searchHook: ReturnType<typeof useSearch>,
    keywordHook: ReturnType<typeof useHotKeywords>,
    tagFilterHook: ReturnType<typeof useTagFilter>,
}){

    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-8 w-1/4 min-w-80 border-2 border-purple-400 rounded-lg bg-white">
            {/*검색창*/}
            <SearchInputContainer
                searchHook={searchHook}
                keywordHook={keywordHook}
                requestHandler={requestHandler}
            ></SearchInputContainer>

            {/*카테고리 필터*/}
            <TagFilter tagFilterHook={tagFilterHook}></TagFilter>
        </div>
    );
}
