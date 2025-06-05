'use client';

import {useState} from "react";

type TagKey = `${string}:${string}`;

export const useTagSelector = () => {

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [isTagsLoading, setTagsLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<{value: string, category: string}>>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

    const createTagKey = (tag: {value: string, category: string}): TagKey =>
        `${tag.category}:${tag.value}`;

    const addSelectedTag = (tag: {value: string, category: string}) => {
        const key = createTagKey(tag);
        setSelectedTags(prev => new Set([...prev, key]));
    };

    const removeSelectedTag = (tag: {value: string, category: string}) => {
        const key = createTagKey(tag);
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    };

    const hasSelectedTag = (tag: {value: string, category: string}): boolean => {
        const key = createTagKey(tag);
        return selectedTags.has(key);
    };

    return {
        isSelectorOpen, setSelectorOpen,
        isTagsLoading, setTagsLoading,
        filterTypes, setFilterTypes,
        searchInput, setSearchInput,
        searchedTags, setSearchedTags,
        selectedTags, setSelectedTags,
        addSelectedTag, removeSelectedTag, hasSelectedTag,
    };
}
