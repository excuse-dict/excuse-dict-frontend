'use client'

import {useEffect, useState} from 'react';
import LoginInput from './components/LoginInput';
import css from './page.module.css'
import {EP_LOGIN, EP_REFRESH_ACCESS_TOKEN, PG_HOME, PG_PASSWORD_RESET, PG_REGISTER} from '../constants/constants';
import {useRouter} from 'next/navigation';
import {useAuthState} from "@/app/login/auth/useAuthState";
import {apiPost} from "@/axios/requests/post/apiPost";
import {sendLoginRequest} from "@/app/login/functions/LoginRequest";

export default function LoginPage() {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [shouldShowError, setShouldShowError] = useState(false);
    const router = useRouter();

    const { login } = useAuthState();

    const handleLogin = async () => {

        sendLoginRequest({
            email: emailInput,
            password: passwordInput,
            overwriteDefaultHandler: true,
            login: login,
            onFail: () => {
                // 로그인 창에 붉은 글씨로 안내
                setShouldShowError(true);
            },
        })
    }

    useEffect(() => {
        if(!shouldShowError) return;
        const timer = setTimeout(() => {
            setShouldShowError(false);
        },3000)
        return () => clearTimeout(timer);
    }, [shouldShowError]);

    return (
        <div className={css.login_container}>
            <h1 className={css.login_title}>로그인</h1>
            <div className={css.login_inner_container}>
                <div className={css.login_input_container}>
                    <div className={css.login_id_pw_container}>
                        <LoginInput
                            placeholder='이메일'
                            input={emailInput}
                            setInput={setEmailInput}
                        ></LoginInput>
                        <LoginInput
                            placeholder='비밀번호'
                            type='password'
                            input={passwordInput}
                            setInput={setPasswordInput}
                        ></LoginInput>
                    </div>
                    <button
                        className={css.login_button}
                        onClick={handleLogin}
                    >로그인
                    </button>
                </div>
                <div className={'flex flex-col text-center'}>
                    <span
                        className={`${css.login_error} ${shouldShowError ? css.visible : ''}`}
                    >이메일 또는 비밀번호가 틀립니다.</span>
                    <div className={css.button_container}>
                        <button
                            className={css.pw_reset}
                            onClick={() => router.push(PG_PASSWORD_RESET)}
                        >비밀번호를 잊어버리셨나요?
                        </button>
                        <button
                            className={css.pw_reset}
                            onClick={() => router.push(PG_REGISTER)}
                        >회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

