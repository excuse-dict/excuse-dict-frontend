import TagSelector from "@/app/excuses/new/components/selector/TagSelector";
import {useTagFilter} from "@/global_components/search/useTagFilter";

export default function TagFilter({ tagFilterHook }:{
    tagFilterHook: ReturnType<typeof useTagFilter>
}){

    const { includeTagSelectorHook, excludeTagSelectorHook } = tagFilterHook;
    
    return (
        <div className="w-full">
            <TagSelector
                label={"포함 태그"}
                tagSelectorHook={includeTagSelectorHook}
            ></TagSelector>
            <TagSelector 
                label={"제외 태그"}
                tagSelectorHook={excludeTagSelectorHook}
            ></TagSelector>
        </div>
    );
}