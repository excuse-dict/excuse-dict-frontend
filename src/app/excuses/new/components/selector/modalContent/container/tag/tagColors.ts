// 원래는 색상만 반환했는데 테일윈드가 런타임에 스타일을 동적으로 생성할 수 없어서 아예 스타일을 만들어 던지도록 변경
export const getBackgroundColorStyle = (category: string)=> {
    switch (category){
        case "ACCIDENT": return 'bg-[#d35353]';
        case "COMPANY": return 'bg-[#4242dc]';
        case "EVENT": return 'bg-[#e3bd6e]';
        case "EXERCISE": return 'bg-[#ff8c42]';
        case "FAMILY": return 'bg-[#e67e8a]';
        case "FINANCIAL": return 'bg-[#27ae60]';
        case "HEALTH": return 'bg-[#4ecdc4]';
        case "HOME_FACILITY": return 'bg-[#8b7ed8]';
        case "LOVE": return 'bg-[#ff6b9d]';
        case "RELIGIOUS": return 'bg-[#f4a261]';
        case "STUDY": return 'bg-[#6c5ce7]';
        case "SUPERNATURAL": return 'bg-[#4A4A4A]';
        case "TRANSPORT": return 'bg-[#2a9d8f]';
        case "WEATHER": return 'bg-[#457b9d]';
        case "ETC": return 'bg-[#757575]';
        default: return 'bg-[#757575]';
    }
}