import TagInterface from "@/app/excuses/new/components/TagInterface";
import css from '../../../../Tag.module.css';

export default function SelectableTag({ tag, isSelected }: {
    tag: TagInterface,
    isSelected: boolean,

}){
    const { category, value } = tag;

    // 원래는 색상만 반환했는데 테일윈드가 런타임에 스타일을 동적으로 생성할 수 없어서 아예 스타일을 만들어 던지도록 변경
    const getColor = (category: string)=> {
        switch (category){
            case "ACCIDENT": return 'bg-[#d35353]';
            case "COMPANY": return 'bg-[#4242dc]';
            case "EVENT": return 'bg-[#e3bd6e]';
            case "FAMILY": return 'bg-[#e67e8a]';
            case "HEALTH": return 'bg-[#4ecdc4]';
            case "HOME_FACILITY": return 'bg-[#8b7ed8]';
            case "LOVE": return 'bg-[#ff6b9d]';
            case "RELIGIOUS": return 'bg-[#f4a261]';
            case "TRANSPORT": return 'bg-[#2a9d8f]';
            case "WEATHER": return 'bg-[#457b9d]';
            case "ETC": return 'bg-[#757575]';
            default: return 'bg-[#757575]';
        }
    }

    return (
        <div className={`${css.tag} ${getColor(category)} flex rounded-md text-sm gap-1 p-0.5 text-white cursor-pointer ${isSelected ? 'border-green-500' : ''}`}>
            <span>{value}</span>
        </div>
    );
}