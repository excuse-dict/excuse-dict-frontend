import {useState} from "react";

interface PageInfo {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    nextPageSize: number;
}

export const usePage = () => {
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        hasNext: false,
        nextPageSize: 0,
    });

    const [isFilterChanged, setFilterChanged] = useState(false);

    const setCurrentPage = (page: number) => {
        setPageInfo(prev => ({ ...prev, currentPage: page }));
    };

    const setTotalPages = (total: number) => {
        setPageInfo(prev => ({ ...prev, totalPages: total }));
    };

    const setTotalElements = (elements: number) => {
        setPageInfo(prev => ({ ...prev, totalElements: elements }));
    };

    const setHasNext = (hasNext: boolean) => {
        setPageInfo(prev => ({ ...prev, hasNext }));
    };

    const isPageEmpty = () => {
        return pageInfo.totalPages < 1;
    }

    return {
        currentPage: pageInfo.currentPage,
        totalPages: pageInfo.totalPages,
        totalElements: pageInfo.totalElements,
        hasNext: pageInfo.hasNext,
        nextPageSize: pageInfo.nextPageSize,

        setCurrentPage, setTotalPages,
        setTotalElements, setHasNext,
        isFilterChanged, setFilterChanged,
        isPageEmpty,

        pageInfo,
        setPageInfo
    };
};