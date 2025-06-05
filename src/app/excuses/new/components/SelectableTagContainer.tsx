import SelectableTag from "@/app/excuses/new/components/SelectableTag";
import css from './Tag.module.css';

export default function SelectableTagContainer({ tags, emptyLabel, isTagsLoading }: {
    tags: { value: string, category: string }[],
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
                    <SelectableTag
                        key={index}
                        tag={tag}
                        isSelected={false}
                    ></SelectableTag>
                ))}
            </>
        )
    }

    return (
        <div className={`relative w-full min-h-4 p-8 rounded-sm flex flex-wrap gap-2 bg-[var(--purple-grey-light)]`}>
            {getTags()}
            <span className={`${css.page_button} left-1`}>{'<'}</span>
            <span className={`${css.page_button} right-1`}>{'>'}</span>
        </div>
    );
}
