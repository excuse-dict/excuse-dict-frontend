import {useState} from "react";
import {REPLY_PAGE_SIZE} from "@/app/constants/constants";

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

    const setNextPageSize = (nextPageSize: number) => {
        setPageInfo(prev => ({ ...prev, nextPageSize }));
    }

    // 더보기 핸들러
    const loadMoreContents = () => {
        setCurrentPage(pageInfo.currentPage + 1);
    }

    // 요소 더하고 페이지 정보 갱신
    const addElementsAndUpdatePageInfo = (addition: number, pageSize: number) => {
        const newTotalElements = pageInfo.totalElements + addition;
        const newTotalPages = Math.ceil(newTotalElements / pageSize);
        const newNextPageSize = newTotalElements % pageSize || pageSize;

        setTotalElements(newTotalElements);
        setTotalPages(newTotalPages);
        setNextPageSize(newNextPageSize);
        setHasNext(pageInfo.currentPage < newTotalPages);
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
        isPageEmpty, addElementsAndUpdatePageInfo,
        loadMoreContents,
        setNextPageSize,

        pageInfo,
        setPageInfo
    };
};