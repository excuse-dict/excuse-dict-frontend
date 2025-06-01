import { useState } from "react";
import Swal from "sweetalert2";

export function usePasswordInput(){
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPwMatched, setPwMatched] = useState(false);

    // 비밀번호 형식이 유효해야 함
    const validatePassword = () => {
        if (!isPasswordValid) {
            Swal.fire('오류', "비밀번호 형식이 유효해야 합니다.", "warning");
            return;
        }
    }
    // 비밀번호 확인란이 일치해야 함
    const validatePwMatched = () => {
        if (!isPwMatched) {
            Swal.fire('오류', "비밀번호를 한번 더 확인해주세요.", "warning");
            return;
        }
    }

    return {
        passwordInput, setPasswordInput,
        isPasswordValid, setPasswordValid,
        passwordConfirmInput, setPasswordConfirmInput,
        isPwMatched, setPwMatched,
        validatePassword, validatePwMatched
    };
}