'use client';

import {useState} from "react";
import {TAG_CATEGORIES} from "@/app/constants/constants";
import TagInterface from "@/app/excuses/new/components/TagInterface";

export const useTagSelector = (tags?: Set<TagInterface> | undefined) => {

    const initializeTags = (): Set<TagInterface> => {
        if(!tags || tags.size == 0) return new Set();

        const set = new Set<TagInterface>();

        tags.forEach(tag => set.add(tag));
        return set;
    }

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [isTagsLoading, setTagsLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<TagInterface>>([]);
    const [selectedTags, setSelectedTags] = useState<Set<TagInterface>>(initializeTags()); // category:value 형태로 넣어야 함
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(TAG_CATEGORIES.map(category => category.value)));

    // 태그 선택
    const addSelectedTag = (tag: TagInterface) => {
        setSelectedTags(prev => new Set([...prev, tag]));
    };

    // 카테고리 선택
    const addSelectedCategory = (categoryValue: string) => {
        setSelectedCategories(prev => new Set([...prev, categoryValue]));
    }

    // 태그 선택 해제
    const removeSelectedTag = (tag: TagInterface) => {
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            newSet.delete(tag);
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
    const hasSelectedTag = (tag: TagInterface): boolean => {
        return selectedTags.has(tag);
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
