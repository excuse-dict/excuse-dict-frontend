'use client'

import { useEffect, useState } from 'react';
import { ALLOWED_SPECIAL_CHARS, ALLOWED_SPECIAL_CHARS_REGEX, EP_CHECK_EMAIL_AVAILABILITY, EP_MEMBERS, EP_NICKNAME_CHECK, EP_VERIFICATION_CODE_REQ, MAX_EMAIL_LENGTH, PG_HOME, VERIFICATION_CODE_PURPOSE } from '../constants/constants';
import css from './page.module.css'
import { apiPost } from '@/axios/apiPost';
import EmailInput from './components/email_input/EmailInput';
import PasswordInput from './components/password_input/PasswordInput';
import PasswordConfirmInput from './components/password_input/PasswordConfirmInput'
import { apiGet } from '@/axios/apiGet';
import Modal from '@/global_components/modal/Modal';
import NicknameInput from './components/nickname_input/NicknameInput';
import Swal from 'sweetalert2';
import { sendLoginRequest } from '../login/functions/LoginRequest';
import { useRouter } from 'next/navigation';
import sendVerificationCode from '@/axios/requests/post/verificationCode';
import { usePasswordInput } from './components/password_input/usePasswordInput';
import VerificationModalContent from './verification/VerificationModalContent';
import { useEmailVerification } from './verification/useEmailVerification';

export default function RegisterPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');

    const router = useRouter();
    const emailVerification = useEmailVerification(VERIFICATION_CODE_PURPOSE.REGISTRATION);
    const password = usePasswordInput();

    const {
        emailInput,
        isEmailVerified, setEmailVerified
    } = emailVerification;

    const {
        passwordInput,
        isPasswordValid,
        isPwMatched
    } = password;

    // 회원가입 요청 전송
    const sendRegisterRequest = () => {
        // 이메일이 인증 상태여야 함
        if (!isEmailVerified) {
            Swal.fire('오류', "이메일 인증 절차를 진행해주세요.", "warning");
            return;
        }
        // 비밀번호 형식이 유효해야 함
        if (!isPasswordValid) {
            Swal.fire('오류', "비밀번호 형식이 유효해야 합니다.", "warning");
            return;
        }
        // 비밀번호 확인란이 일치해야 함
        if (!isPwMatched) {
            Swal.fire('오류', "비밀번호를 한번 더 확인해주세요.", "warning");
            return;
        }
        // 가입 요청 전송
        apiPost({
            endPoint: EP_MEMBERS,
            body: {
                email: emailInput,
                nickname: nicknameInput,
                rawPassword: passwordInput,
            },
            onSuccess: () => handleRegisterSucceed()
        });
    }

    const handleRegisterSucceed = () => {
        Swal.fire("회원가입 완료", `${nicknameInput}님 환영합니다!`, "success")
            .then(() => {
                // 자동 로그인 요청 전송
                sendLoginRequest({
                    email: emailInput,
                    password: passwordInput,
                    onSuccess: () => router.push(PG_HOME),
                    onFail: () => router.push('/login')
                });
            });
    }

    return (
        <div className={css.reg_container}>
            <h2 className={css.reg_label}>회원가입</h2>
            <div className={css.reg_main}>
                <EmailInput
                    emailVerification={emailVerification}
                    setModalOpen={setModalOpen}
                ></EmailInput>
                <NicknameInput
                    nicknameInput={nicknameInput}
                    setNicknameInput={setNicknameInput}
                ></NicknameInput>
                <PasswordInput
                    title='비밀번호'
                    placeholder='비밀번호를 입력해주세요.'
                    password={password}
                ></PasswordInput>
                <PasswordConfirmInput
                    title='비밀번호 확인'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                    password={password}
                ></PasswordConfirmInput>
                <button
                    className={css.register_button}
                    onClick={sendRegisterRequest}
                >가입</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            >
                <VerificationModalContent
                    emailVerification={emailVerification}
                    onSuccess={() => {
                        setModalOpen(false);
                        Swal.fire("인증 완료", "인증 코드가 확인되었습니다.", 'success');
                        setEmailVerified(true);
                    }}
                ></VerificationModalContent>
            </Modal>
        </div>
    );
}