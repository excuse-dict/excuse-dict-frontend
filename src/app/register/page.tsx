'use client'

import { useEffect, useState } from 'react';
import { ALLOWED_SPECIAL_CHARS, ALLOWED_SPECIAL_CHARS_REGEX, EP_CHECK_EMAIL_AVAILABILITY, EP_MEMBERS, EP_NICKNAME_CHECK, EP_VERIFICATION_CODE_REQ, MAX_EMAIL_LENGTH } from '../constants/constants';
import css from './page.module.css'
import { apiPost } from '@/axios/apiPost';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import PasswordConfirmInput from './components/PasswordConfirmInput'
import { apiGet } from '@/axios/apiGet';
import VerificationModalContent from '@/global_components/modal/content/verification/VerificationModalContent';
import Modal from '@/global_components/modal/Modal';
import NicknameInput from './components/NicknameInput';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPwMatched, setPwMatched] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEmailSending, setEmailSending] = useState(false);
    const [isSendingSucceed, setSendingSucceed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(-1); // -1: 메일 안 보낸 상태
    const [nicknameInput, setNicknameInput] = useState('');

    // 모달 열 때마다 남은 시간 초기화
    useEffect(() => {
        setTimeLeft(-1);
    }, [isModalOpen]);

    // 이메일 전송
    const smtpRequest = () => {
        // 이메일 보내는 중...
        setEmailSending(true);
        apiPost({
            endPoint: EP_VERIFICATION_CODE_REQ,
            body: { email: emailInput },
            onSuccess: (response) => {
                setEmailSending(false); // 이메일 전송 완료!
                setSendingSucceed(true);
                setTimeLeft(calculateTimeLeft(response.data.expiryTime));
            },
            onFail: () => {
                setEmailSending(false);
                setSendingSucceed(false);
                setTimeLeft(-1);
            }
        });
    }

    // 메일 만료시간을 받아 남은 시간을 초 수로 계산
    const calculateTimeLeft = (expiryTime: string) => {
        const now = new Date();
        const expiry = new Date(expiryTime);

        const diffMinute = expiry.getTime() - now.getTime();
        const diffSec = Math.floor(diffMinute / 1000);

        return Math.max(0, diffSec);
    }

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
        if(!isPwMatched){
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
            onSuccess: () => {
                Swal.fire("회원가입 완료", `${nicknameInput}님 환영합니다!`, "success");
            }
        });
    }

    return (
        <div className={css.reg_container}>
            <h2 className={css.reg_label}>회원가입</h2>
            <div className={css.reg_main}>
                <EmailInput
                    emailInput={emailInput}
                    setEmailInput={setEmailInput}
                    smtpRequest={smtpRequest}
                    setModalOpen={setModalOpen}
                    setEmailSending={setEmailSending}
                    setSendingSucceed={setSendingSucceed}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    isEmailVerified={isEmailVerified}
                ></EmailInput>
                <NicknameInput
                    nicknameInput={nicknameInput}
                    setNicknameInput={setNicknameInput}
                ></NicknameInput>
                <PasswordInput
                    title='비밀번호'
                    placeholder='비밀번호를 입력해주세요.'
                    passwordInput={passwordInput}
                    setPasswordInput={setPasswordInput}
                    passwordConfirmInput={passwordConfirmInput}
                    setPwMatched={setPwMatched}
                    setPasswordValid={setPasswordValid}
                ></PasswordInput>
                <PasswordConfirmInput
                    title='비밀번호 확인'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                    passwordInput={passwordInput}
                    passwordConfirmInput={passwordConfirmInput}
                    setPasswordConfirmInput={setPasswordConfirmInput}
                    isPwMatched={isPwMatched}
                    setPwMatched={setPwMatched}
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
                    smtpRequest={smtpRequest}
                    emailInput={emailInput}
                    isEmailSending={isEmailSending}
                    setEmailSending={setEmailSending}
                    isSendingSucceed={isSendingSucceed}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    setModalOpen={setModalOpen}
                    setEmailVerified={setEmailVerified}
                ></VerificationModalContent>
            </Modal>
        </div>
    );
}