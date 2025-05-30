'use client'

import PasswordConfirm from "../register/components/password_input/PasswordConfirmInput";
import PasswordInput from "../register/components/password_input/PasswordInput";
import { usePasswordInput } from "../register/components/password_input/usePasswordInput";

export default function PasswordResetVerifiedPage(){

    const password = usePasswordInput();

    return (
        <div className="inner_container">
            <PasswordInput
                title="새 비밀번호"
                placeholder="새 비밀번호를 입력해주세요."
                password={password}
            ></PasswordInput>
            <PasswordConfirm
                title="비밀번호 확인"
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                password={password}
            ></PasswordConfirm>
            <button
                className="global_button rounded-[10px] p-2" 
            >비밀번호 변경</button>
        </div>
    );
}