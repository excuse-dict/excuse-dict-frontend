import { useState } from "react";
import css from './PasswordInput.module.css'
import pageCss from '../../page.module.css';
import { usePasswordInput } from "./usePasswordInput";

export default function PasswordConfirm({ title, placeholder, password }:
    {
        title: string,
        placeholder: string,
        password: ReturnType<typeof usePasswordInput>
    }
) {
    const {
        passwordInput,
        passwordConfirmInput, setPasswordConfirmInput,
        isPwMatched, setPwMatched
    } = password;

    const [isInputEmpty, setInputEmpty] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;

        setInputEmpty(input.length === 0);
        setPasswordConfirmInput(input);
        setPwMatched(passwordInput === input);
    }

    return (
        <div className={pageCss.reg_input_container}>
            <label className='global_input_label'>{title}</label>
            <div className={css.pw_input_container}>
                <input
                    className='global_input'
                    placeholder={placeholder}
                    value={passwordConfirmInput}
                    onChange={handleChange}
                    type='password'
                ></input>
                <span
                    className={`${css.pw_error} ${!(isInputEmpty || isPwMatched) ? css.show : ''}`}
                >비밀번호가 일치하지 않습니다.</span>
            </div>
        </div>
    );
}