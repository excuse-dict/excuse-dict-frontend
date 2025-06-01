import {useCallback, useState} from "react";
import Swal from "sweetalert2";
import {ALLOWED_SPECIAL_CHARS_REGEX, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from "@/app/constants/constants";

export function usePasswordInput(){
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPwMatched, setPwMatched] = useState(false);

    // 유효성 검증상태
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isLowerCaseIncluded, setIsLowerCaseIncluded] = useState(false);
    const [isUpperCaseIncluded, setIsUpperCaseIncluded] = useState(false);
    const [isDigitIncluded, setIsDigitIncluded] = useState(false);
    const [isSpecialCharacterIncluded, setIsSpecialCharacterIncluded] = useState(false);
    const [isAllCharactersValid, setIsAllCharactersValid] = useState(true);

    // 비밀번호 검증 및 업데이트 로직
    const handlePasswordChange = useCallback((input: string) => {
        // 길이 검사
        const lengthValid = input.length >= MIN_PASSWORD_LENGTH && input.length <= MAX_PASSWORD_LENGTH;
        setIsLengthValid(lengthValid);

        // 영문 소문자
        const lowerCaseIncluded = /[a-z]/.test(input);
        setIsLowerCaseIncluded(lowerCaseIncluded);

        // 대문자
        const upperCaseIncluded = /[A-Z]/.test(input);
        setIsUpperCaseIncluded(upperCaseIncluded);

        // 숫자
        const digitIncluded = /\d/.test(input);
        setIsDigitIncluded(digitIncluded);

        // 특수문자
        const specialCharacterIncluded = ALLOWED_SPECIAL_CHARS_REGEX.test(input);
        setIsSpecialCharacterIncluded(specialCharacterIncluded);

        // 허용되지 않는 문자가 포함되었는지
        const allowdCharactersRegex: RegExp = new RegExp(`^[a-zA-Z0-9${ALLOWED_SPECIAL_CHARS_REGEX.source.slice(1, -1)}]*$`);
        const allCharactersValid = allowdCharactersRegex.test(input);
        setIsAllCharactersValid(allCharactersValid);

        // 비밀번호 확인란 일치 여부 업데이트
        setPwMatched(passwordConfirmInput === input);

        // 자신 업데이트
        setPasswordInput(input);

        // 비밀번호 유효 여부 업데이트
        const isPasswordValid = lengthValid && lowerCaseIncluded && upperCaseIncluded
            && digitIncluded && specialCharacterIncluded && allCharactersValid;
        setPasswordValid(isPasswordValid);
    }, [passwordConfirmInput]);

    // 제출 전 비밀번호 형식 유효한지 확인
    const validatePassword = () => {
        if (!isPasswordValid) {
            Swal.fire('오류', "비밀번호 형식이 유효해야 합니다.", "warning");
            return;
        }
    }
    // 제출 전 비밀번호 확인란이 일치하는지 확인
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
        validatePassword, validatePwMatched,
        handlePasswordChange,
        validations: {
            isLengthValid,
            isLowerCaseIncluded,
            isUpperCaseIncluded,
            isDigitIncluded,
            isSpecialCharacterIncluded,
            isAllCharactersValid
        }
    };
}