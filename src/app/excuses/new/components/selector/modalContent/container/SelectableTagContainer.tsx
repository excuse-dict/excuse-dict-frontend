import SelectableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/SelectableTag";
import css from '../../../Tag.module.css';
import {usePage} from "@/global_components/page/usePage";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";

export default function SelectableTagContainer({searchedTags, emptyLabel, pageInfo, tagSelector}: {
    searchedTags: { value: string, category: string }[],
    emptyLabel?: string,
    pageInfo: ReturnType<typeof usePage>,
    tagSelector: ReturnType<typeof useTagSelector>,
}) {

    const {currentPage, setCurrentPage, totalPage, isPageEmpty} = pageInfo;
    const {isTagsLoading, hasSelectedTag} = tagSelector;

    const getTags = () => {
        const label = isTagsLoading ? '태그 불러오는 중...' : emptyLabel || '태그 없음';
        return (
            <>
                {!searchedTags || searchedTags?.length === 0 ?
                    <span className={'w-full text-gray-400 text-center'}>{label}</span> : null}
                {searchedTags?.map((tag, index) => (
                    <SelectableTag
                        key={index}
                        tagInterface={tag}
                        isSelected={hasSelectedTag(tag)}
                        tagSelector={tagSelector}
                    ></SelectableTag>
                ))}
            </>
        )
    }

    const handleClick = (direction: 'LEFT' | 'RIGHT') => {
        const dx = direction === 'LEFT' ? -1 : 1;

        let nextPage = currentPage + dx;
        if (nextPage <= 0) {
            nextPage = totalPage;
        } else if (nextPage > totalPage) {
            nextPage = 1;
        }

        setCurrentPage(nextPage);
    }

    return (
        <div
            className={`relative w-full min-h-4 pl-8 pr-8 rounded-sm flex flex-wrap justify-center gap-2`}>
            {getTags()}
            {isTagsLoading || isPageEmpty() ? null :
                <>
                    <button
                        className={`${css.page_button} left-1`}
                        hidden={totalPage < 1}
                        onClick={() => handleClick('LEFT')}
                    >{'<'}</button>
                    <button
                        className={`${css.page_button} right-1`}
                        onClick={() => handleClick("RIGHT")}
                    >{'>'}</button>
                </>
            }
        </div>
    );
}
