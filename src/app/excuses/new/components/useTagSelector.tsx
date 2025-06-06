'use client';

import {useState} from "react";
import {TAG_CATEGORIES} from "@/app/constants/constants";

type TagKey = `${string}:${string}`;

export const useTagSelector = () => {

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [isTagsLoading, setTagsLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<{value: string, category: string}>>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(TAG_CATEGORIES.map(category => category.value)));

    const createTagKey = (tag: {value: string, category: string}): TagKey =>
        `${tag.category}:${tag.value}`;

    // 태그 선택
    const addSelectedTag = (tag: {value: string, category: string}) => {
        const key = createTagKey(tag);
        setSelectedTags(prev => new Set([...prev, key]));
    };

    // 카테고리 선택
    const addSelectedCategory = (categoryValue: string) => {
        setSelectedCategories(prev => new Set([...prev, categoryValue]));
    }

    // 태그 선택 해제
    const removeSelectedTag = (tag: {value: string, category: string}) => {
        const key = createTagKey(tag);
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    };

    // 카테고리 선택 해제
    const removeSelectedCategory = (categoryValue: string) => {
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            newSet.delete(categoryValue);
            return newSet;
        })
    }

    // 태그 선택 여부 확인
    const hasSelectedTag = (tag: {value: string, category: string}): boolean => {
        const key = createTagKey(tag);
        return selectedTags.has(key);
    };

    // 카테고리 선택 여부 확인
    const hasSelectedCategory = (categoryValue: string) => {
        return selectedCategories.has(categoryValue);
    }

    // 카테고리 전체 선택
    const addAllCategories = () => {
        setSelectedCategories(new Set(TAG_CATEGORIES.map(category => category.value)));
    }

    // 카테고리 전체 선택 해제
    const clearSelectedCategory = () => {
        setSelectedCategories(new Set());
    }

    return {
        isSelectorOpen, setSelectorOpen,
        isTagsLoading, setTagsLoading,
        filterTypes, setFilterTypes,
        searchInput, setSearchInput,
        searchedTags, setSearchedTags,
        selectedTags,
        addSelectedTag, removeSelectedTag, hasSelectedTag,
        selectedCategories, setSelectedCategories,
        addSelectedCategory, removeSelectedCategory, hasSelectedCategory,
        addAllCategories, clearSelectedCategory,
    };
}
