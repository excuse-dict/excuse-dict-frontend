'use client'

import { useState } from 'react';
import LoginInput from './components/LoginInput';
import css from './page.module.css'
import { apiPost } from '@/axios/apiPost';
import { EP_LOGIN } from '../constants/constants';

export default function LoginPage(){

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const sendLoginRequest = () => {
        apiPost({
            endPoint: EP_LOGIN,
            body: {
                email: emailInput,
                password: passwordInput
            }
        })
    }

    return (
        <div className={css.login_container}>
            <img className={css.login_image}></img>
            <div className={css.login_inner_container}>
                <h3 className={css.login_title}>로그인</h3>
                <div className={css.login_inner_box}>
                    <div className={css.login_input_container}>
                        <div className={css.login_id_pw_container}>
                            <LoginInput placeholder='이메일'></LoginInput>
                            <LoginInput placeholder='비밀번호' type='password'></LoginInput>
                        </div>
                        <button className={css.login_button} onClick={sendLoginRequest}>로그인</button>
                    </div>
                    <div className={css.button_container}>
                        <button className={css.pw_reset}>비밀번호 변경</button>
                        <button className={css.pw_reset}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}