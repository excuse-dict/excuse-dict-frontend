import {TAG_CATEGORIES} from "@/app/constants/constants";
import {getBackgroundColorStyle} from "@/app/excuses/new/components/selector/modalContent/container/tag/tagColors";

export default function CategoryFilter(){

    const categoriesArray = Array.from(TAG_CATEGORIES);

    return (
        <div className={'w-full flex flex-col'}>
            <span>카테고리 필터</span>
            <div className={'flex flex-wrap gap-1 justify-center items-center bg-[var(--purple-grey-light)] w-full flex-1 p-2'}>
                {categoriesArray.length === 0 && <span className={'text-[var(--placeholder-color)]'}>카테고리 없음</span>}
                {categoriesArray.map((category, index) => {
                    return (
                        <div key={index} className={`flex rounded-sm items-center pl-1 pr-1 gap-1 ${getBackgroundColorStyle(category.value)}`}>
                            <span className={'text-md'}>{category.emoji}</span>
                            <span className={'text-white text-sm'}>{category.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}