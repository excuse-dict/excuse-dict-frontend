import RemovableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/RemovableTag";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
export default function RemovableTagContainer({ tagSelector, emptyLabel, hideBorder = false, hideBackground = false }: {
    tagSelector: ReturnType<typeof useTagSelector>,
    emptyLabel?: string,
    hideBorder?: boolean,
    hideBackground?: boolean,
}){

    const { selectedTagObjects, isTagsLoading } = tagSelector;

    const getTags = () => {
        const label = isTagsLoading ? '태그 불러오는 중...' : emptyLabel || '태그 없음';
        const tagArray = Array.from(selectedTagObjects.values());

        return (
            <>
                {!selectedTagObjects || selectedTagObjects?.size === 0 ?
                    <span className={'w-full text-[var(--placeholder-color)] text-center'}>{label}</span> : null}
                {tagArray?.map((tag, index) => (
                    <RemovableTag
                        key={index}
                        tagInterface={tag}
                        tagSelector={tagSelector}
                    ></RemovableTag>
                ))}
            </>
        )
    }

    const getBorder = () => {
        return hideBorder ? '' : 'border-2 border-[var(--purple-grey)]';
    }

    const getBackground = () => {
        return hideBackground ? '' : 'bg-[var(--purple-grey-highlighted)]';
    }

    return (
        <div className={`global_tag_container w-full ${getBorder()} ${getBackground()}`}>
            {getTags()}
        </div>
    );
}
