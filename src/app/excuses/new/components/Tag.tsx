import {match} from "node:assert";

export default function Tag({ type, name }: {
    type: string,
    name: string,
}){

    const getColor = (type: string)=> {
        switch (type){
            case "ACCIDENT": return '#d35353';
            case "COMPANY": return '#4242dc';
            case "EVENT": return '#e3bd6e';
            case "FAMILY": return '#e67e8a';
            case "HEALTH": return '#4ecdc4';
            case "HOME_FACILITY": return '#8b7ed8';
            case "LOVE": return '#ff6b9d';
            case "RELIGIOUS": return '#f4a261';
            case "TRANSPORT": return '#2a9d8f';
            case "WEATHER": return '#457b9d';
            case "ETC": return '#757575';
            default: return '#757575';
        }
    }

    return (
        <div className={`bg-[${getColor(type)}]`}>
            <span>{name}</span>
            <button>×</button>
        </div>
    );
}