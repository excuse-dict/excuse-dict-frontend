import RemovableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/RemovableTag";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
export default function RemovableTagContainer({ tagSelector, emptyLabel }: {
    tagSelector: ReturnType<typeof useTagSelector>,
    emptyLabel?: string,
}){

    const { selectedTags, isTagsLoading } = tagSelector;

    const parseTagKey = (tagKey: string): TagInterface => {
        const [category, value] = tagKey.split(':');
        return { category, value };
    };

    const getTags = () => {
        const label = isTagsLoading ? '태그 불러오는 중...' : emptyLabel || '태그 없음';
        const tagArray = Array.from(selectedTags.values());

        return (
            <>
                {!selectedTags || selectedTags?.size === 0 ?
                    <span className={'w-full text-gray-400 text-center'}>{label}</span> : null}
                {tagArray?.map((key, index) => (
                    <RemovableTag
                        key={index}
                        tagInterface={parseTagKey(key)}
                        tagSelector={tagSelector}
                    ></RemovableTag>
                ))}
            </>
        )
    }

    return (
        <div className={`w-full min-h-4 p-2 rounded-sm flex flex-wrap justify-center gap-2 bg-[var(--purple-grey-light)]`}>
            {getTags()}
        </div>
    );
}
