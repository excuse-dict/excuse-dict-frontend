import {useSearch} from "@/global_components/search/useSearch";
import SearchInputContainer from "@/global_components/search/SearchInputContainer";

export default function Searcher(){
    const searchHook = useSearch();

    return (
        <SearchInputContainer searchHook={searchHook}></SearchInputContainer>
    );
}