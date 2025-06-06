import SelectableTagContainer
    from "@/app/excuses/new/components/selector/modalContent/container/SelectableTagContainer";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_TAGS, MAX_SELECTED_TAGS} from "@/app/constants/constants";
import RemovableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/RemovableTagContainer";
import {usePage} from "@/global_components/page/usePage";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import CategoryFilter from "@/app/excuses/new/components/selector/modalContent/container/filter/CategoryFilter";

export default function TagSelectorModalContent({
                                                    tagSelector
                                                }: {
    tagSelector: ReturnType<typeof useTagSelector>
}) {

    const {
        isTagsLoading, setTagsLoading,
        selectedTags,
        searchedTags, setSearchedTags,
    } = tagSelector;

    const [searchValue, setSearchValue] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Array<{ label: string, value: string }>>([]);

    const page = usePage();
    const {totalElements, setPageInfo, currentPage, totalPage} = page;

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
        <div className={'flex flex-col w-full h-full'}>
            {/* 상단 */}
            <div className={'flex flex-col gap-2 items-center flex-1 overflow-auto pt-4 pb-4'}>
                <div className={'flex flex-col w-4/5 text-center gap-4'}>
                    <h1 className={'font-bold text-2xl mb-4'}>태그 검색</h1>
                    <CategoryFilter
                        tagSelector={tagSelector}
                    ></CategoryFilter>
                    <div className={'global_input_container flex flex-col flex-[4] gap-0.5'}>
                        <div className={'global_input_label'}>검색어 입력</div>
                        <input
                            className={'global_input'}
                            placeholder={'검색어가 없으면 전체 결과가 표시됩니다.'}
                            onChange={(e) => setSearchValue(e.target.value)}
                        ></input>
                        <button className={'global_button w-full !bg-[var(--purple-grey)] rounded-md'}>적용</button>
                    </div>
                    <div className={'flex justify-between pl-2 pr-2'}>
                        <span>{`검색 결과: ${totalElements}개`}</span>
                        <span>{`${currentPage}/${totalPage}`}</span>
                    </div>
                    <div className={'flex items-center'}>
                        <SelectableTagContainer
                            searchedTags={searchedTags}
                            emptyLabel={'사용 가능한 태그 없음'}
                            pageInfo={page}
                            tagSelector={tagSelector}
                        ></SelectableTagContainer>
                    </div>
                </div>
            </div>

            {/* 하단 선택된 태그 - 전체 너비 */}
            <div
                className={'bg-[var(--purple-grey-light)] w-full py-4'}
            >
                <div>
                    <span>선택된 태그 (</span>
                    <span className={selectedTags.size >= MAX_SELECTED_TAGS ? 'text-blue-500' : ''}>
                    {`${selectedTags.size}개 / 최대 ${MAX_SELECTED_TAGS}개`}
                </span>
                    <span>)</span>
                </div>
                <RemovableTagContainer
                    tagSelector={tagSelector}
                    hideBorder={true}
                    hideBackground={true}
                />
            </div>
        </div>
    );
}