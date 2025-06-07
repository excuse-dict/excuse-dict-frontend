import {useState} from "react";

interface PageInfo {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
}

export const usePage = () => {
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        currentPage: 1,
        totalPages: 0,
        totalElements: 0,
        hasNext: false
    });

    const [nextSearchPage, setNextSearchPage] = useState(1);

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
        totalPage: pageInfo.totalPages,
        totalElements: pageInfo.totalElements,
        hasNext: pageInfo.hasNext,

        setCurrentPage, setTotalPages,
        setTotalElements, setHasNext,
        nextSearchPage, setNextSearchPage,
        isPageEmpty,

        pageInfo,
        setPageInfo
    };
};