import {
    ALLOWED_SPECIAL_CHARS,
    ALLOWED_SPECIAL_CHARS_REGEX,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH
} from "@/app/constants/constants";
import {useState} from "react";
import css from './PasswordInput.module.css'
import {usePasswordInput} from "./usePasswordInput";
import ValidationRule from "@/app/register/components/password_input/ValidationRule";

// 비밀번호 입력창
export default function PasswordInput({title, placeholder, password}:
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;
        password.handlePasswordChange(input);
    }

    return (
        <div className='global_input_container w-full'>
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
                {(passwordInput.length === 0 || !isInputFocused) ? <div/> :
                    <div className={css.pw_validation_tooltip}>
                        <ul>
                            <ValidationRule
                                condition={validations.isLengthValid}>
                                {`${MIN_PASSWORD_LENGTH}~${MAX_PASSWORD_LENGTH}자`}
                            </ValidationRule>
                            <ValidationRule condition={validations.isLowerCaseIncluded}>영문 소문자</ValidationRule>
                            <ValidationRule condition={validations.isUpperCaseIncluded}>영문 대문자</ValidationRule>
                            <ValidationRule condition={validations.isDigitIncluded}>숫자</ValidationRule>
                            <ValidationRule condition={validations.isAllCharactersValid}>허용되지 않은 문자</ValidationRule>
                            <ValidationRule condition={validations.isSpecialCharacterIncluded}
                                            isSpecialCharacterSpan={true}>
                                {`특수문자 ⓘ`}
                                <span className={css.tooltip}>
                                    다음 문자들 중 하나를 포함해야 합니다:<br/>
                                    {ALLOWED_SPECIAL_CHARS}
                                </span>
                            </ValidationRule>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}