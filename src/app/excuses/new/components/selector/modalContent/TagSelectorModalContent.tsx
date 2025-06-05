import InputWithButton from "@/global_components/input/with_button/InputWithButton";
import SelectableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/SelectableTagContainer";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_TAGS} from "@/app/constants/constants";
import RemovableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/RemovableTagContainer";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {usePage} from "@/global_components/page/usePage";

export default function TagSelectorModalContent({
                                                    searchedTags, setSearchedTags,
                                                    selectedTags, setSelectedTags,
                                                    isTagsLoading,
                                                    setTagsLoading
}: {
    searchedTags: TagInterface[],
    setSearchedTags: (tags: TagInterface[]) => void,
    selectedTags: TagInterface[],
    setSelectedTags: (tags: TagInterface[]) => void,
    isTagsLoading: boolean,
    setTagsLoading: (value: boolean) => void,
}){

    const [searchValue, setSearchValue] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Array<{label: string, value: string}>>([]);

    const page = usePage();
    const { pageInfo, setPageInfo, currentPage, setCurrentPage, totalPage } = page;

    // 태그 조회
    const searchTags = () => {
        setTagsLoading(true);
        apiGet({
            endPoint: EP_TAGS,
            params: {
                'categories': selectedCategories,
                'searchValue': searchValue,
                'page': currentPage,
            },
            onSuccess: (response) => {
                setTagsLoading(false);
                setSearchedTags(response?.data?.data?.tags?.content);

                const pageInfo = response?.data?.data?.pageInfo;
                setPageInfo(pageInfo);
            }
        })
    }

    // pageInfo 바뀔 때마다 새로 요청
    useEffect(() => {
        searchTags();
    }, [currentPage]);

    return (
        <div className={'w-3/4 flex flex-col'}>
            <h1>태그 검색</h1>
            <div className={'flex justify-between'}>
                <span>사용 가능한 태그</span>
                <span>{`${currentPage}/${totalPage}`}</span>
            </div>
            <SelectableTagContainer
                tags={searchedTags}
                emptyLabel={'사용 가능한 태그 없음'}
                isTagsLoading={isTagsLoading}
                pageInfo={page}
            ></SelectableTagContainer>
            <span>선택된 태그</span>
            <RemovableTagContainer
                tags={selectedTags}
                isTagsLoading={isTagsLoading}
            ></RemovableTagContainer>
            <span>카테고리 필터</span>
            <InputWithButton 
                labelText={'태그명 검색'}
                placeholder={'검색어를 입력해주세요.'}
                onInputChange={(e) => setSearchValue(e.target.value)}
                buttonText={'검색'}
            ></InputWithButton>
            <div className={'flex w-full justify-center gap-4'}>
                <button className={'global_button'}>태그 추가</button>
                <button className={'global_button'}>취소</button>
            </div>
        </div>
    );
}