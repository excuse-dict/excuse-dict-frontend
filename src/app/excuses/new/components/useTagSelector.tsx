'use client';

import {useState} from "react";

export const useTagSelector = () => {

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<{type: string, name: string}>>([]);
    const [selectedTags, setSelectedTags] = useState<Array<{type: string, name: string}>>([]);

    return {
        isSelectorOpen, setSelectorOpen,
        filterTypes, setFilterTypes,
        searchInput, setSearchInput,
        searchedTags, setSearchedTags,
        selectedTags, setSelectedTags,
    };
}
