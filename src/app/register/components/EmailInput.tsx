import { useEffect } from "react";
import css from './EmailInput.module.css'
import pageCss from '../page.module.css';
import { EP_CHECK_EMAIL_AVAILABILITY, MAX_EMAIL_LENGTH } from "@/app/constants/constants";
import { apiGet } from "@/axios/apiGet";
import Swal from "sweetalert2";

// 이메일 입력창
export default function EmailInput({ isEmailVerified, emailInput, setEmailInput, smtpRequest, setModalOpen, timeLeft, setTimeLeft }: {
    isEmailVerified: boolean,
    emailInput: string,
    setEmailInput: (value: string) => void,
    smtpRequest: (value: string) => void,
    setSendingSucceed: (value: boolean) => void,
    setModalOpen: (value: boolean) => void,
    setEmailSending: (value: boolean) => void,
    timeLeft: number,
    setTimeLeft: (value: number) => void
}) {

    // 1초마다 코드 만료까지 남은 시간 업데이트
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer); // 클린업
    }, [timeLeft]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setEmailInput(input);
    }

    const isEmailValidSimple = () => {
        return emailInput.length > 0 && emailInput.includes('@');
    }

    return (
        <div className={pageCss.reg_input_container}>
            <div className={pageCss.reg_input_label}>이메일</div>
            <div className={css.email_input_container}>
                <input
                    className={pageCss.reg_input}
                    placeholder={`이메일을 입력해 주세요 (최대 ${MAX_EMAIL_LENGTH}자)`}
                    type='email'
                    readOnly={isEmailVerified}
                    maxLength={MAX_EMAIL_LENGTH}
                    value={emailInput}
                    onChange={handleChange}
                ></input>
                <button
                    className={css.email_dupl_check}
                    disabled={isEmailVerified}
                    onClick={async () => {
                        if (isEmailValidSimple()) {
                            await apiGet({
                                endPoint: EP_CHECK_EMAIL_AVAILABILITY,
                                params: { email: emailInput },
                                onSuccess: (data) => {
                                    // 사용 가능 이메일 - 모달 오픈
                                    if (data.data) {
                                        smtpRequest(emailInput);
                                        setModalOpen(true);
                                    } else { // 이미 사용중
                                        setModalOpen(false);
                                        Swal.fire("오류", "이미 가입하신 이메일입니다.", "error");
                                    }
                                },
                            })
                        } else {
                            Swal.fire("오류", "이메일을 올바르게 입력해주세요", "warning");
                        }
                    }}
                >{isEmailVerified ? '인증 완료' : '인증'}</button>
            </div>
        </div>
    );
}