import TagInterface from "@/app/excuses/new/components/TagInterface";
import css from '../../../../Tag.module.css';
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import {getBackgroundColorStyle} from "@/app/excuses/new/components/selector/modalContent/container/tag/tagColors";

export default function RemovableTag({ tagInterface, tagSelector }: {
    tagInterface: TagInterface,
    tagSelector: ReturnType<typeof useTagSelector>,
}){

    const { category, value } = tagInterface;
    const { removeSelectedTag } = tagSelector;

    const handleRemoveTag = () => {
        removeSelectedTag(tagInterface);
    }

    return (
        <div className={`${css.tag} ${getBackgroundColorStyle(category)} flex text-sm gap-1 text-white cursor-pointer`}>
            <span>{value}</span>
            <button
                className={css.x_button}
                onClick={handleRemoveTag}
            >✕</button>
        </div>
    );
}