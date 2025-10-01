'use client';

import InputComponent from "@/global_components/input/text/InputComponent";
import TextBox from "@/global_components/input/text/TextBox";
import TagSelector from "@/app/excuses/new/components/selector/TagSelector";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_POST, PG_EXCUSES} from "@/app/constants/constants";
import {useState} from "react";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Swal from "sweetalert2";

export default function NewExcusePage(){

    const [situationInput, setSituationInput] = useState('');
    const [excuseInput, setExcuseInput] = useState('');

    const tagSelector = useTagSelector();
    const { selectedTags } = tagSelector;

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
            text: "게시글을 등록하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "등록",
            cancelButtonText: "취소",
        })
            .then((result) => {
                if(result.isConfirmed) handlePost();
            })
    }
    const handlePost = () => {
        apiPost({
            endPoint: EP_POST,
            body: {
                'situation': situationInput,
                'excuse': excuseInput,
                'tags': Array.from(selectedTags),
            },
            onSuccess: (response) => {
                const uri = response?.headers?.location;

                if(uri){
                    const postId = uri.split('/').pop();
                    // 작성글로 곧장 이동
                    window.location.href = PG_EXCUSES + `/${postId}`;
                }else{
                    // 전체 게시판으로 이동
                    window.location.href = PG_EXCUSES;
                }
            }
        })
    }

    return (
        <div className={`global_container w-3/5`}>
            <div className="w-3/5">
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
                <button
                    className={`global_button rounded-md p-1 mt-8`}
                    onClick={handleClick}
                >글쓰기</button>
            </div>
        </div>
    );
}