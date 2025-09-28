import {useSearch} from "@/global_components/search/useSearch";

export default function Searcher({ requestHandler, searchHook }: {
    requestHandler: () => void,
    searchHook: ReturnType<typeof useSearch>,
}){

    const { searchInput, setSearchInput } = searchHook;

    return (
        <div className="flex w-full rounded-lg overflow-hidden">
            <input className="w-full focus:outline-purple-400 p-2 pl-4 pr-4"
                   placeholder={"검색어를 입력하세요"}
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
            ></input>
            <button
                className="global_button bg-purple-400 text-white text-lg p-2 pl-6 pr-6"
                onClick={requestHandler}
            >🔎︎</button>
        </div>
    );
}