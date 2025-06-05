import RemovableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/RemovableTag";
import TagInterface from "@/app/excuses/new/components/TagInterface";
export default function RemovableTagContainer({ tags, emptyLabel, isTagsLoading }: {
    tags: Set<string>,
    emptyLabel?: string,
    isTagsLoading: boolean,
}){

    const parseTagKey = (tagKey: string): TagInterface => {
        const [category, value] = tagKey.split(':');
        return { category, value };
    };

    const getTags = () => {
        const label = isTagsLoading ? '태그 불러오는 중...' : emptyLabel || '태그 없음';
        const tagArray = Array.from(tags.values());

        return (
            <>
                {!tags || tags?.size === 0 ?
                    <span className={'w-full text-gray-400 text-center'}>{label}</span> : null}
                {tagArray?.map((key, index) => (
                    <RemovableTag
                        key={index}
                        tag={parseTagKey(key)}
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
