'use client';

import {useState} from "react";

export const useTagSelector = () => {

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [isTagsLoading, setTagsLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<{value: string, category: string}>>([]);
    const [selectedTags, setSelectedTags] = useState<Array<{value: string, category: string}>>([]);

    return {
        isSelectorOpen, setSelectorOpen,
        isTagsLoading, setTagsLoading,
        filterTypes, setFilterTypes,
        searchInput, setSearchInput,
        searchedTags, setSearchedTags,
        selectedTags, setSelectedTags,
    };
}
