import {TAG_CATEGORIES} from "@/app/constants/constants";
import {getBackgroundColorStyle} from "@/app/excuses/new/components/selector/modalContent/container/tag/tagColors";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import LabeledCheckbox from "@/global_components/input/checkbox/LabeledCheckbox";
import {usePage} from "@/global_components/page/usePage";

export default function CategoryFilter({ tagSelector, page }: {
    tagSelector: ReturnType<typeof useTagSelector>
    page: ReturnType<typeof usePage>
}) {

    const categoriesArray = Array.from(TAG_CATEGORIES);

    const { selectedCategories, addAllCategories, clearSelectedCategory,
        hasSelectedCategory, addSelectedCategory, removeSelectedCategory } = tagSelector;

    const { isFilterChanged, setFilterChanged } = page;

    const handleClick = (categoryValue: string) => {
        if(hasSelectedCategory(categoryValue)){
            // 선택 해제
            removeSelectedCategory(categoryValue);
        }else{
            // 선택
            addSelectedCategory(categoryValue);
        }
        setFilterChanged(true);
    }

    const isAllCategorySelected = () => {
        return selectedCategories.size === TAG_CATEGORIES.length;
    }

    const handleCheck = () => {
        if(isAllCategorySelected()){
            // 전체 해제
            clearSelectedCategory();
        }else{
            // 전체 선택
            addAllCategories();
        }
    }

    const getBorder = () => {
        return 'border-2 border-transparent hover:border-[var(--placeholder-color)]';
    }

    const getBrightness = (isSelected: boolean) => {
        return isSelected ? '' : 'brightness-[0.5] opacity-[0.9]';
    }

    const getFontWeight = (isSelected: boolean) => {
        return isSelected ? 'font-bold' : '';
    }

    return (
        <div className={'w-full flex flex-col'}>
            <div className={'flex justify-between'}>
                <div className={'flex gap-1'}>
                    <span>{`카테고리 필터 (${selectedCategories.size}/${TAG_CATEGORIES.length} 선택됨)`}</span>
                    {isFilterChanged && <span className={'text-blue-500'}>{'*변경됨'}</span>}
                </div>
                <LabeledCheckbox
                    labelText={isAllCategorySelected() ? '전체 해제' : '전체 선택'}
                    labelPosition={'RIGHT'}
                    checked={isAllCategorySelected()}
                    onChange={handleCheck}
                ></LabeledCheckbox>
            </div>
            <div
                className={'flex gap-1 items-center bg-[var(--purple-grey-light)] w-full p-2 overflow-auto'}>
                {categoriesArray.length === 0 && <span className={'text-[var(--placeholder-color)]'}>카테고리 없음</span>}
                {categoriesArray.map((category, index) => {

                    const isSelected = hasSelectedCategory(category.value);

                    return (
                        <button key={index}
                             className={`flex rounded-sm items-center pl-1 pr-1 gap-1 cursor-pointer transition-colors duration-200 
                                ${getBorder()} ${getBackgroundColorStyle(category.value)} ${getBrightness(isSelected)} ${getFontWeight(isSelected)}`}
                             onClick={() => handleClick(category.value)}
                        >
                            <span className={'text-md'}>{category.emoji}</span>
                            <span className={'text-white text-sm whitespace-nowrap'}>{category.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}