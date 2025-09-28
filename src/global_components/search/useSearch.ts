import {useState} from "react";

export type SearchCondition =  '제목 + 내용' | '제목' | '내용' | '작성자';

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchCondition, setSearchCondition] = useState<SearchCondition>('제목');

    return {
        searchInput, setSearchInput,
        searchCondition, setSearchCondition,
    }
}