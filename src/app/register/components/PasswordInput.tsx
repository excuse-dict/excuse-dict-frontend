import { ALLOWED_SPECIAL_CHARS, ALLOWED_SPECIAL_CHARS_REGEX, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/app/constants/constants";
import { useState } from "react";
import css from './PasswordInput.module.css'
import pageCss from '../page.module.css'

// 비밀번호 입력창
export default function PasswordInput({ title, placeholder, passwordInput, setPasswordInput, passwordConfirmInput, setPwMatched, setPasswordValid }:
    {
        title: string,
        placeholder: string,
        passwordInput: string,
        setPasswordInput: (value: string) => void
        passwordConfirmInput: string,
        setPwMatched: (value: boolean) => void
        setPasswordValid: (value: boolean) => void
    }) {
    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isLowerCaseIncluded, setIsLowerCaseIncluded] = useState(false);
    const [isUpperCaseIncluded, setIsUpperCaseIncluded] = useState(false);
    const [isDigitIncluded, setIsDigitIncluded] = useState(false);
    const [isSpecialCharacterIncluded, setIsSpecialCharacterIncluded] = useState(false);
    const [isAllCharactersValid, setIsAllCharactersValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;

        // 입력 비었는지 여부
        setIsInputEmpty(input.length === 0);
        // 길이 검사
        setIsLengthValid(input.length >= MIN_PASSWORD_LENGTH && input.length <= MAX_PASSWORD_LENGTH);
        // 영문 소문자
        setIsLowerCaseIncluded(/[a-z]/.test(input));
        // 대문자
        setIsUpperCaseIncluded(/[A-Z]/.test(input));
        // 숫자
        setIsDigitIncluded(/\d/.test(input));
        // 특수문자
        setIsSpecialCharacterIncluded(ALLOWED_SPECIAL_CHARS_REGEX.test(input));
        // 허용되지 않는 문자가 포함되었는지
        const allowdCharactersRegex: RegExp = new RegExp(`^[a-zA-Z0-9${ALLOWED_SPECIAL_CHARS_REGEX.source.slice(1, -1)}]*$`);
        setIsAllCharactersValid(allowdCharactersRegex.test(input));

        // 비밀번호 확인란 일치 여부 업데이트
        setPwMatched(passwordConfirmInput === input);
        // 자신 업데이트
        setPasswordInput(input);

        // 비밀번호 유효 여부 업데이트
        const isPasswordValid = isLengthValid && isLowerCaseIncluded && isUpperCaseIncluded
        && isDigitIncluded && isSpecialCharacterIncluded && isAllCharactersValid;
        setPasswordValid(isPasswordValid);
    }

    const validColor: string = 'rgb(100, 210, 100)';
    const invalidColor: string = 'rgb(255, 100, 100)';
    // 조건을 입력받아 스타일 객체 반환
    const getValidationStyle = (condition: boolean) => {
        return {
            isVisible: condition,
            style: {
                color: condition ? validColor : invalidColor,
                fontSize: '12px'
            }
        };
    };

    // 개별 유효성 검사 항목
    const ValidationRule = ({ condition, children, isSpecialCharacterSpan = false }: {
        condition: boolean,
        children: React.ReactNode,
        isSpecialCharacterSpan?: boolean
    }) => {

        const { isVisible, style } = getValidationStyle(condition);
        const id: string = isSpecialCharacterSpan ? 'special_character_span' : '';

        return (
            <li className={css.pw_validation_item} id={id}>
                <span style={style}>{children}</span>
                {!isVisible ? <div /> : <span style={{ color: style.color }}>✔</span>}
            </li>
        );
    }

    return (
        <div className={pageCss.reg_input_container}>
            <label className={pageCss.reg_input_label}>{title}</label>
            <div className={css.pw_input_container}>
                <input
                    className={pageCss.reg_input}
                    placeholder={placeholder}
                    value={passwordInput}
                    onChange={handleChange}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    type='password'
                ></input>
            </div>
            <div className={css.pw_validation_container}>
                {(isInputEmpty || !isInputFocused) ? <div /> :
                    <div className={css.pw_validation_tooltip}>
                        <ul>
                            <ValidationRule condition={isLengthValid}>
                                {`${MIN_PASSWORD_LENGTH}~${MAX_PASSWORD_LENGTH}자`}
                            </ValidationRule>
                            <ValidationRule condition={isLowerCaseIncluded}>영문 소문자</ValidationRule>
                            <ValidationRule condition={isUpperCaseIncluded}>영문 대문자</ValidationRule>
                            <ValidationRule condition={isDigitIncluded}>숫자</ValidationRule>
                            <ValidationRule condition={isAllCharactersValid}>허용되지 않은 문자</ValidationRule>
                            <ValidationRule condition={isSpecialCharacterIncluded} isSpecialCharacterSpan={true}>
                                {`특수문자 ⓘ`}
                                <span className={css.tooltip}>
                                    다음 문자들 중 하나를 포함해야 합니다:<br />
                                    {ALLOWED_SPECIAL_CHARS}
                                </span>
                            </ValidationRule>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}