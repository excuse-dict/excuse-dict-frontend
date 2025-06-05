import RemovableTag from "@/app/excuses/new/components/RemovableTag";
import TagInterface from "@/app/excuses/new/components/TagInterface";
export default function RemovableTagContainer({ tags, emptyLabel, isTagsLoading }: {
    tags: TagInterface[],
    emptyLabel?: string,
    isTagsLoading: boolean,
}){

    const getTags = () => {
        const label = isTagsLoading ? '태그 불러오는 중...' : emptyLabel || '태그 없음';
        return (
            <>
                {!tags || tags?.length === 0 ?
                    <span className={'w-full text-gray-400 text-center'}>{label}</span> : null}
                {tags?.map((tag, index) => (
                    <RemovableTag
                        key={index}
                        tag={tag}
                    ></RemovableTag>
                ))}
            </>
        )
    }

    return (
        <div className={`w-full min-h-4 p-2 rounded-sm flex flex-wrap gap-2 bg-[var(--purple-grey-light)]`}>
            {getTags()}
        </div>
    );
}
