'use client';

import {useMemo, useState} from "react";
import {TAG_CATEGORIES} from "@/app/constants/constants";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {keyToTag, tagToKey} from "@/lib/TagHelper";

export const useTagSelector = (
    tags?: Set<TagInterface> | undefined,
    addOptions?: {
        onBeforeAdd?: (tag: TagInterface) => boolean | Promise<boolean>,
        onBeforeRemove?: (tag: TagInterface) => boolean | Promise<boolean>,
    }
) => {

    const initializeTags = (): Set<string> => {
        if(!tags || tags.size == 0) return new Set();

        const set = new Set<string>();

        tags.forEach(tag => set.add(tagToKey(tag)));
        return set;
    }

    const [isSelectorOpen, setSelectorOpen] = useState(false);
    const [isTagsLoading, setTagsLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedTags, setSearchedTags] = useState<Array<TagInterface>>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(initializeTags());
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(TAG_CATEGORIES.map(category => category.value)));

    // 태그 선택
    const addSelectedTag = async (tag: TagInterface) => {

        // swal로 확인 필요시 멈춤
        if(addOptions?.onBeforeAdd){
            const shouldAdd = await addOptions.onBeforeAdd(tag);
            if (!shouldAdd) return;
        }

        setSelectedTags(prev => {
            const newSet = new Set(prev);
            newSet.add(tagToKey(tag));
            return newSet;
        });
    };

    // 카테고리 선택
    const addSelectedCategory = (categoryValue: string) => {
        setSelectedCategories(prev => new Set([...prev, categoryValue]));
    }

    // 태그 선택 해제
    const removeSelectedTag = async (tag: TagInterface) => {
        // swal로 확인 필요시 멈춤
        if (addOptions?.onBeforeRemove) {
            const shouldRemove = await addOptions.onBeforeRemove(tag);
            if (!shouldRemove) return;
        }

        setSelectedTags(prev => {
            const newSet = new Set(prev);
            newSet.delete(tagToKey(tag));
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
        return selectedTags.has(tagToKey(tag));
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
        selectedTags: useMemo(
            () => new Set(Array.from(selectedTags).map(key => keyToTag(key))),
            [selectedTags]
        ),
        addSelectedTag, removeSelectedTag, hasSelectedTag,
        selectedCategories, setSelectedCategories,
        addSelectedCategory, removeSelectedCategory, hasSelectedCategory,
        addAllCategories, clearSelectedCategory,
    };
}
