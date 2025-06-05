import SelectableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/SelectableTag";
import css from '../../../Tag.module.css';
import {usePage} from "@/global_components/page/usePage";

export default function SelectableTagContainer({ tags, emptyLabel, isTagsLoading, pageInfo }: {
    tags: { value: string, category: string }[],
    emptyLabel?: string,
    isTagsLoading: boolean,
    pageInfo: ReturnType<typeof usePage>,
}){

    const { currentPage, setCurrentPage, totalPage } = pageInfo;

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

    const handleClick = (direction: 'LEFT' | 'RIGHT') => {
        const dx = direction === 'LEFT' ? -1 : 1;

        console.log("currentPage: ", currentPage);

        let nextPage = currentPage + dx;
        if(nextPage <= 0){
            nextPage = totalPage;
        }else if (nextPage > totalPage){
            nextPage = 1;
        }

        setCurrentPage(nextPage);
    }

    return (
        <div className={`relative w-full min-h-4 p-8 rounded-sm flex flex-wrap gap-2 bg-[var(--purple-grey-light)]`}>
            {getTags()}
            <button
                className={`${css.page_button} left-1`}
                onClick={() => handleClick('LEFT')}
            >{'<'}</button>
            <button
                className={`${css.page_button} right-1`}
                onClick={() => handleClick("RIGHT")}
            >{'>'}</button>
        </div>
    );
}
