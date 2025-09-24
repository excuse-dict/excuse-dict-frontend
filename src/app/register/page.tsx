'use client'

import {useState} from 'react';
import {
    EP_MEMBERS,
    PG_HOME,
    PG_LOGIN,
    VERIFICATION_CODE_PURPOSE
} from '../constants/constants';
import css from './page.module.css'
import {apiPost} from '@/axios/requests/post/apiPost';
import EmailInput from './components/email_input/EmailInput';
import PasswordInput from './components/password_input/PasswordInput';
import PasswordConfirmInput from './components/password_input/PasswordConfirmInput'
import Modal from '@/global_components/modal/Modal';
import NicknameInput from './components/nickname_input/NicknameInput';
import Swal from 'sweetalert2';
import {useRouter} from 'next/navigation';
import {usePasswordInput} from './components/password_input/usePasswordInput';
import VerificationModalContent from './verification/VerificationModalContent';
import {useEmailVerification} from './verification/useEmailVerification';
import ReCAPTCHAComponent from "@/app/recaptcha/ReCAPTCHAComponent";
import {useAuthState} from "@/app/login/auth/useAuthState";

export default function RegisterPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');
    const { login } = useAuthState();

    const router = useRouter();
    const emailVerification = useEmailVerification(VERIFICATION_CODE_PURPOSE.REGISTRATION);
    const password = usePasswordInput();

    const {
        emailInput,
        isEmailVerified, setEmailVerified,
        recaptchaRef
    } = emailVerification;

    const {
        passwordInput,
        isPasswordValid, isPwMatched
    } = password;

    // 회원가입 요청 전송
    const sendRegisterRequest = async () => {
        // 이메일이 인증 상태여야 함
        if (!isEmailVerified) {
            Swal.fire('오류', "이메일 인증 절차를 진행해주세요.", "warning");
            return;
        }

        // 비밀번호 유효성 검증
        if(!isPasswordValid){
            Swal.fire("오류", "비밀번호 형식이 올바르지 않습니다.", "warning");
            return;
        }

        // 비밀번호 확인란 일치 여부 검증
        if(!isPwMatched){
            Swal.fire("오류", "비밀번호를 한번 더 확인해주세요.", "warning");
        }

        // 가입 요청 전송
        apiPost({
            endPoint: EP_MEMBERS,
            body: {
                email: emailInput,
                nickname: nicknameInput,
                rawPassword: passwordInput
            },
            onSuccess: () => handleRegisterSucceed(),
        });
    }

    const handleRegisterSucceed = () => {
        Swal.fire("회원가입 완료", `${nicknameInput}님 환영합니다!`, "success")
            .then(() => {
                // 자동 로그인 요청 전송
                login({
                    email: emailInput,
                    password: passwordInput,
                    onFail: () => router.push(PG_LOGIN)
                });
            });
    }

    return (
        <>
            <div className={"global_inner_container"}>
                <h1 className={css.reg_label}>회원가입</h1>
                <h2 className='mb-6 font-light text-sm'>환영합니다</h2>
                <div className={css.reg_main}>
                    <EmailInput
                        emailVerification={emailVerification}
                        setModalOpen={setModalOpen}
                    />
                    <div  // section을 div로 변경
                        className={`transition-all duration-1000 ease-in-out ${
                            isEmailVerified
                                ? 'opacity-100 transform translate-y-0 mb-4 max-h-[1000px]'
                                : 'opacity-0 transform translate-y-2 mb-0 h-0 max-h-0'
                        }`}
                        style={{
                            width: '100%',
                            maxWidth: '28rem',
                            margin: '0 auto'
                        }}
                    >
                        {isEmailVerified && (
                            <>
                                <NicknameInput
                                    nicknameInput={nicknameInput}
                                    setNicknameInput={setNicknameInput}
                                />
                                <PasswordInput
                                    title='비밀번호'
                                    placeholder='비밀번호를 입력해주세요.'
                                    password={password}
                                />
                                <PasswordConfirmInput
                                    title='비밀번호 확인'
                                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                                    password={password}
                                />
                                <button
                                    className={css.register_button}
                                    onClick={sendRegisterRequest}
                                >
                                    가입
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            >
                <VerificationModalContent
                    emailVerification={emailVerification}
                    onSuccess={() => {
                        setModalOpen(false);
                        Swal.fire("인증 완료", "인증 코드가 확인되었습니다.", 'success')
                            .then(() => {
                                setEmailVerified(true);
                            });
                    }}
                />
            </Modal>
            <ReCAPTCHAComponent recaptchaRef={recaptchaRef} />
        </>
    );
}
