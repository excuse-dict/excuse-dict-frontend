'use client';

import InputComponent from "@/global_components/input/text/InputComponent";
import TextBox from "@/global_components/input/text/TextBox";
import TagSelector from "@/app/excuses/new/components/selector/TagSelector";
import {EP_UPDATE_OR_DELETE_POST} from "@/app/constants/constants";
import {useEffect, useState} from "react";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Swal from "sweetalert2";
import {usePostCache} from "@/app/excuses/edit/hook/PostCache";
import {useRouter} from "next/navigation";
import {apiPatch} from "@/axios/requests/patch/apiPatch";
import {toast} from "react-toastify";

export default function EditExcusePage(){

    const { cachedPost } = usePostCache();
    const router = useRouter();

    const [situationInput, setSituationInput] = useState(cachedPost?.excuse?.situation || '');
    const [excuseInput, setExcuseInput] = useState(cachedPost?.excuse?.excuse || '');

    const tagSelector = useTagSelector(new Set(cachedPost?.excuse?.tags));
    const { selectedTagObjects } = tagSelector;

    useEffect(() => {
        if(!cachedPost) {
            toast("게시글 정보를 불러올 수 없습니다.");
            router.back();
        }
    }, [cachedPost, router]);

    const isEdited = () => {
        return isSituationChanged() || isExcuseChanged() || isTagsChanged();
    }

    const isSituationChanged = () => {
        return cachedPost?.excuse?.situation !== situationInput;
    }

    const isExcuseChanged = () => {
        return cachedPost?.excuse?.excuse !== excuseInput;
    }

    const isTagsChanged = () => {
        cachedPost?.excuse?.tags.forEach((tag) => {
            if(!selectedTagObjects.has(tag)) return true;
        });
        return false;
    }

    const handleClick = () => {
        if(situationInput.length < 3){
            Swal.fire("오류", "상황은 3글자 이상으로 입력해주세요.", "warning");
            return;
        }
        if(excuseInput.length < 5 || excuseInput.length > 100){
            Swal.fire("오류", "핑계는 5~100 글자 사이로 입력해주세요.", "warning");
            return;
        }
        Swal.fire({
            title: "확인",
            text: "게시글을 수정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "수정",
            cancelButtonText: "취소",
        })
            .then((result) => {
                if(result.isConfirmed) handleUpdate();
            })
    }

    const handleUpdate = () => {

        apiPatch({
            endPoint: EP_UPDATE_OR_DELETE_POST(cachedPost?.postId as number),
            body: {
                ...(isSituationChanged() && { situation: situationInput }),
                ...(isExcuseChanged() && { excuse: excuseInput }),
                ...(isTagsChanged() && { tags: selectedTagObjects }),
            },
            onSuccess: () => {
                toast("게시물이 수정되었습니다.");
                router.back();
            }
        })
    }

    return (
        <div className={`global_container w-3/5`}>
            <InputComponent
                value={situationInput}
                setValue={setSituationInput}
                inputContainerStyle={'w-3/5'}
                label="제목"
                placeholder="빠져나가고 싶은 상황을 입력해주세요."
            ></InputComponent>
            <TextBox
                value={excuseInput}
                setValue={setExcuseInput}
                label={'핑계'}
                min={5}
                max={100}
                placeholder={"핑계를 입력해주세요."}
                containerStyle={'w-3/5'}
            ></TextBox>
            <TagSelector tagSelectorHook={tagSelector}></TagSelector>
            <div className="flex gap-4">
                <button
                    disabled={!isEdited()}
                    className={`global_button rounded-md p-1 mt-8`}
                    onClick={handleClick}
                    style={!isEdited() ? {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        pointerEvents: 'none'
                    } : {}}
                >수정</button>
                <button
                    className={`global_button rounded-md p-1 mt-8`}
                    onClick={() => router.back()}
                >취소</button>
            </div>
        </div>
    );
}