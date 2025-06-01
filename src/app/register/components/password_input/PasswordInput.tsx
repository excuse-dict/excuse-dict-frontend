import { ALLOWED_SPECIAL_CHARS, ALLOWED_SPECIAL_CHARS_REGEX, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/app/constants/constants";
import { useState } from "react";
import css from './PasswordInput.module.css'
import pageCss from '../../page.module.css';
import { usePasswordInput } from "./usePasswordInput";
import {input} from "sucrase/dist/types/parser/traverser/base";

// 비밀번호 입력창
export default function PasswordInput({ title, placeholder, password }:
    {
        title: string,
        placeholder: string,
        password: ReturnType<typeof usePasswordInput>
    }) {
    const {
        passwordInput,
        validations
    } = password;

    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;

        setIsInputEmpty(input.length === 0);
        password.handlePasswordChange(input);
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
        <div className='global_input_container'>
            <label className='global_input_label'>{title}</label>
            <div className='global_input_inner_container'>
                <input
                    className='global_input'
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
                            <ValidationRule condition={validations.isLengthValid}>
                                {`${MIN_PASSWORD_LENGTH}~${MAX_PASSWORD_LENGTH}자`}
                            </ValidationRule>
                            <ValidationRule condition={validations.isLowerCaseIncluded}>영문 소문자</ValidationRule>
                            <ValidationRule condition={validations.isUpperCaseIncluded}>영문 대문자</ValidationRule>
                            <ValidationRule condition={validations.isDigitIncluded}>숫자</ValidationRule>
                            <ValidationRule condition={validations.isAllCharactersValid}>허용되지 않은 문자</ValidationRule>
                            <ValidationRule condition={validations.isSpecialCharacterIncluded} isSpecialCharacterSpan={true}>
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