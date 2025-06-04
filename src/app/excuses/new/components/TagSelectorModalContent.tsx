import InputWithButton from "@/global_components/input/with_button/InputWithButton";
import TagContainer from "@/app/excuses/new/components/TagContainer";
import {useEffect, useState} from "react";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_TAGS} from "@/app/constants/constants";

export default function TagSelectorModalContent({ searchedTags, setSearchedTags }: {
    searchedTags: {name: string, type: string}[],
    setSearchedTags: (tags: {name: string, type: string}[]) => void,
}){

    const [searchValue, setSearchValue] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Array<{label: string, value: string}>>([]);

    // 태그 조회
    const searchTags = () => {
        apiGet({
            endPoint: EP_TAGS,
            params: {
                'filterTypes': selectedCategories,
                'searchValue': searchValue,
            },
            onSuccess: (response) => {
                setSearchedTags(response?.data?.tags);
            }
        })
    }

    useEffect(() => {
        searchTags();
    }, []);

    return (
        <div className={'w-3/5 flex flex-col'}>
            <h1>태그 검색</h1>
            <span>사용 가능한 태그</span>
            <TagContainer 
                tags={searchedTags}
                emptyLabel={'사용 가능한 태그 없음'}
            ></TagContainer>
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