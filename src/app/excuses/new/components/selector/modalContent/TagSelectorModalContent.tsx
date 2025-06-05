import InputWithButton from "@/global_components/input/with_button/InputWithButton";
import SelectableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/SelectableTagContainer";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_TAGS, MAX_SELECTED_TAGS} from "@/app/constants/constants";
import RemovableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/RemovableTagContainer";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {usePage} from "@/global_components/page/usePage";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";

export default function TagSelectorModalContent({
                                                    tagSelector
}: {
    tagSelector: ReturnType<typeof useTagSelector>
}){

    const {
        isTagsLoading, setTagsLoading,
        selectedTags,
        searchedTags, setSearchedTags,
    } = tagSelector;

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
            <h1 className={'font-bold'}>태그 검색</h1>
            <div className={'flex justify-between'}>
                <span>사용 가능한 태그</span>
                <span>{`${currentPage}/${totalPage}`}</span>
            </div>
            <SelectableTagContainer
                searchedTags={searchedTags}
                emptyLabel={'사용 가능한 태그 없음'}
                pageInfo={page}
                tagSelector={tagSelector}
            ></SelectableTagContainer>
            <span>{`선택된 태그 (${selectedTags.size}개 / 최대 ${MAX_SELECTED_TAGS}개)`}</span>
            <RemovableTagContainer
                tagSelector={tagSelector}
            ></RemovableTagContainer>
            <span>카테고리 필터</span>
            <InputWithButton 
                labelText={'태그명 검색'}
                placeholder={'검색어를 입력해주세요.'}
                onInputChange={(e) => setSearchValue(e.target.value)}
                buttonText={'검색'}
            ></InputWithButton>
        </div>
    );
}