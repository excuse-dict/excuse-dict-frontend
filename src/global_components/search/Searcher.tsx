import {useSearch} from "@/global_components/search/useSearch";
import SearchInputContainer from "@/global_components/search/SearchInputContainer";
import TagFilter from "@/global_components/search/TagFilter";
import {useTagFilter} from "@/global_components/search/useTagFilter";

export default function Searcher({ requestHandler, searchHook }: {
    requestHandler: () => void,
    searchHook: ReturnType<typeof useSearch>,
}){

    const tagFilterHook = useTagFilter();

    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-8 w-1/4 min-w-80 border-2 border-purple-400 rounded-lg overflow-hidden bg-white">
            {/*검색창*/}
            <SearchInputContainer
                searchHook={searchHook}
                requestHandler={requestHandler}
            ></SearchInputContainer>

            {/*카테고리 필터*/}
            <TagFilter tagFilterHook={tagFilterHook}></TagFilter>
        </div>
    );
}