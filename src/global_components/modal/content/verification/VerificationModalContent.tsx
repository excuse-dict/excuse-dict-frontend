import LoadingWidget from "@/components/loading/LoadingWidget";
import ModalContent from "../ModalContent";
import css from './VerificationModalContent.module.css'
import CodeInput from "@/components/input/code/CodeInput";
import { useState } from "react";
import { apiPost } from "@/axios/apiPost";
import { EP_VERIFY } from "@/app/constants/constants";
import Swal from "sweetalert2";

export default function VerificationModalContent({ smtpRequest, emailInput, isEmailSending, setEmailSending, isSendingSucceed, timeLeft, setTimeLeft, setModalOpen, setEmailVerified }: {
    smtpRequest: (value: string) => void,
    emailInput: string,
    isEmailSending: boolean,
    setEmailSending: (value: boolean) => void,
    isSendingSucceed: boolean,
    timeLeft: number,
    setTimeLeft: (value: number) => void,
    setModalOpen: (value: boolean) => void,
    setEmailVerified: (value: boolean) => void 
}) {
    const codeLength = 6;
    const [codes, setCodes] = useState<string[]>(new Array(codeLength).fill(''));

    const getTimeText = (): string => {
        if (timeLeft === 0) return "(만료됨!)";
        return timeLeft >= 0 ? `(${timeLeft}초 후 만료)` : '';
    }

    const resetContent = () => {
        setEmailSending(true);
        setTimeLeft(-1);
    }

    const getCode = () => {
        let code: string = ''
        for (let i = 0; i < codes.length; i++) {
            code += codes[i];
        }
        return code;
    }

    const submitCode = async () => {
        const code: string = getCode();

        if (code.length < codeLength) {
            Swal.fire('오류', `코드 ${codeLength}자리를 모두 입력해 주세요`, 'warning');
            return;
        }

        apiPost({
            endPoint: EP_VERIFY,
            body: {
                email: emailInput,
                verificationCode: code,
            },
            onSuccess: () => {
                setModalOpen(false);
                Swal.fire("인증 완료", "인증 코드가 확인되었습니다.", 'success');
                setEmailVerified(true);
            },
            onFail: () => {
                Swal.fire('오류', '코드가 일치하지 않거나 만료되었습니다.<br>다시 확인해 주세요.', 'error');
            }
        });
    }

    return (
        <ModalContent align='center'>
            <h2 className={`${css.modal_text} ${css.modal_title}`}>인증 번호 입력</h2>
            <LoadingWidget
                color='grey'
                isLoading={isEmailSending}
                isSucceed={isSendingSucceed}
                loadingTitle='메일 전송 중...'
                successTitle='메일 전송 완료!'
                failTitle="메일 전송 실패"
            ></LoadingWidget>
            <span className={css.modal_text}>
                {emailInput} 으로 인증 번호 요청을 전송하였습니다.<br />
                복사하여 입력해 주세요. {getTimeText()}
            </span>
            <CodeInput
                legnth={codeLength}
                codes={codes}
                setCodes={setCodes}
            ></CodeInput>
            <div className={css.modal_button_container}>
                <button
                    className={css.modal_confirm_button}
                    onClick={() => {
                        resetContent();
                        smtpRequest(emailInput);
                    }}
                >재전송</button>
                <button
                    className={css.modal_confirm_button}
                    onClick={() => submitCode()}
                >확인</button>
            </div>
        </ModalContent>
    );
}