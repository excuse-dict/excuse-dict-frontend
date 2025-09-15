'use client';

import TextBox from "@/global_components/input/text/TextBox";
import {useState} from "react";
import css from '../../global_components/loading/LoadingWidget.module.css';
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_GENERATE_EXCUSE} from "@/app/constants/constants";
import {toast} from "react-toastify";
import CopyableTextbox from "@/global_components/text/CopyableTextbox";

export default function ExcuseGeneratorPage(){

    const [situationInput, setSituationInput] = useState('');
    const [answer, setAnswer] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [isSucceed, setSucceed] = useState(false);

    const handleGenerate = () => {

        if(!isInputValid()){
            toast("상황은 5~100자로 입력해주세요.");
            return;
        }

        setLoading(true);
        setSucceed(false);

        apiGet({
            endPoint: EP_GENERATE_EXCUSE,
            params: {
                situation: situationInput,
            },
            onSuccess: (response) => {
                setAnswer(response.data);
                setLoading(false);
                setSucceed(true);
            }
        });
    }

    const isInputValid = () => {
        return situationInput.length >= 5 && situationInput.length <= 100;
    }

    return (
        <div className="flex flex-col m-auto p-10 items-center w-1/3 rounded bg-white">
            <h1 className="font-bold text-2xl">핑계 생성기</h1>
            <span className="font-light text-sm">하늘이 무너져도 솟아날 구멍 만들기</span>
            {/*상황 기입란*/}
            <TextBox
                value={situationInput}
                setValue={setSituationInput}
                placeholder="AI에게 상황을 설명해주세요"
                min={5}
                max={100}
                containerStyle="w-full mt-16"
            ></TextBox>
            {isLoading ?
                /*로딩 스피너*/
                <div className={`${css.loading_spinner} !w-12 !h-12 mt-8`}></div>
            : (
                isSucceed ? (
                    /*AI의 답변*/
                    <div>
                        <div className="text-center text-2xl mt-4 mb-4">↓</div>
                        <CopyableTextbox
                            text={answer}
                            style="bg-blue-200 rounded p-4"
                        ></CopyableTextbox>
                    </div>
                ) : <></>
            )}
            {/*AI응답 요청 버튼*/}
            <button
                className='global_button mt-8 ml-auto w-20 p-1 rounded'
                disabled={!isInputValid()}
                style={!isInputValid() ? {
                    background: 'gray',
                    cursor: 'not-allowed',
                    opacity: 0.6,
                    color: '#9ca3af'
                } : {}}
                onClick={handleGenerate}
            >{(isSucceed ? "재" : '') + "생성"}</button>
        </div>
    );
}
