import TagInterface from "@/app/excuses/new/components/TagInterface";
import css from '../../../../Tag.module.css';
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import {MAX_SELECTED_TAGS} from "@/app/constants/constants";
import {getBackgroundColorStyle} from "@/app/excuses/new/components/selector/modalContent/container/tag/tagColors";

export default function SelectableTag({ tagInterface, isSelected, tagSelector }: {
    tagInterface: TagInterface,
    isSelected: boolean,
    tagSelector: ReturnType<typeof useTagSelector>

}){
    const { category, value } = tagInterface;
    const { selectedTags, hasSelectedTag, addSelectedTag, removeSelectedTag } = tagSelector;

    const handleSelect = () => {

        if(hasSelectedTag(tagInterface)){
            removeSelectedTag(tagInterface);
        }else{
            if(selectedTags.size >= MAX_SELECTED_TAGS){
                return;
            }
            addSelectedTag(tagInterface);
        }
    }

    const getFont = () => {
        return isSelected ? 'font-bold text-sm' : 'text-sm';
    }

    const getBrightness = () => {
        return isSelected ? '' : 'brightness-[0.75]';
    }

    return (
        <button
            className={`${css.tag} flex ${getBackgroundColorStyle(category)} ${getBrightness()} ${getFont()} gap-1 p-0.5 text-white cursor-pointer `}
            onClick={handleSelect}
        >
            <span>{value}</span>
        </button>
    );
}