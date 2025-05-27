import { useEffect } from "react";
import css from './EmailInput.module.css'
import pageCss from '../page.module.css';
import { EP_CHECK_EMAIL_AVAILABILITY, EP_NICKNAME_CHECK, MAX_EMAIL_LENGTH, MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from "@/app/constants/constants";
import { apiGet } from "@/axios/apiGet";
import Swal from "sweetalert2";

// 이메일 입력창
export default function NicknameInput({ isNicknameChecked, nicknameInput, setNicknameInput }: {
    isNicknameChecked: boolean,
    nicknameInput: string,
    setNicknameInput: (value: string) => void,
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setNicknameInput(input);
    }

    const isNicknameLengthValid = () => {
        return nicknameInput.length >= MIN_NICKNAME_LENGTH && nicknameInput.length <= MAX_EMAIL_LENGTH;
    }

    const handleClick = () => {
        if(!isNicknameLengthValid()){
            Swal.fire("오류", `닉네임은 ${MIN_NICKNAME_LENGTH}~${MAX_NICKNAME_LENGTH}자 사이여야 합니다.`, 'warning');
            return;
        }

        apiGet({
            endPoint: EP_NICKNAME_CHECK,
            params: { nickname: nicknameInput },
            onSuccess: () => {
                // 사용 가능 이메일 - 모달 오픈
                Swal.fire(nicknameInput, "사용 가능한 닉네임입니다.", "success");
            },
        });
    }

    return (
        <div className={pageCss.reg_input_container}>
            <div className={pageCss.reg_input_label}>닉네임</div>
            <div className={css.email_input_container}>
                <input
                    className={pageCss.reg_input}
                    placeholder={`닉네임을 입력해 주세요 (${MIN_NICKNAME_LENGTH}~${MAX_NICKNAME_LENGTH}자)`}
                    maxLength={MAX_NICKNAME_LENGTH}
                    value={nicknameInput}
                    onChange={handleChange}
                ></input>
                <button
                    className={css.email_dupl_check}
                    disabled={isNicknameChecked}
                    onClick={handleClick}
                >{isNicknameChecked ? '인증 완료' : '인증'}</button>
            </div>
        </div>
    );
}