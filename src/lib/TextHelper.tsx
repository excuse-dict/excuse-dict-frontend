// 텍스트에서 키워드를 찾아서 하이라이트 처리
import {SearchTypeInterface} from "@/global_components/search/useSearch";

export const highlightKeywords = (
    text: string,
    keywords: string[] | null | undefined,
    latestSearchType: SearchTypeInterface | null,
    targetSearchType: SearchTypeInterface | SearchTypeInterface[],
) => {

    if (!keywords || keywords.length === 0) {
        return text;
    }

    const shouldHighlight = () => {

        if(latestSearchType == null) return false;

        const getKey = (value: string) =>
            Object.keys(SearchType).find(key => SearchType[key as keyof typeof SearchType] === value);

        return Array.isArray(targetSearchType)
            ? targetSearchType.includes(latestSearchType)
            : targetSearchType === latestSearchType
    };

    if(!shouldHighlight()) return text;

    const pattern = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
        if (keywords.some(keyword => part.toLowerCase() === keyword.toLowerCase())) {
            return (
                <mark
                    key={index}
                    className="bg-yellow-200 px-0.5 rounded-sm"
                    style={{ padding: '0 2px' }}
                >
                    {part}
                </mark>
            );
        }
        return part;
    });
};