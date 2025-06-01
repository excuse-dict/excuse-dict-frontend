
import css from './VerificationModalContent.module.css'
import { useEffect, useState } from "react";
import { apiPost } from "@/axios/apiPost";
import Swal from "sweetalert2";
import LoadingWidget from "@/global_components/loading/LoadingWidget";
import CodeInput from "@/global_components/input/code/CodeInput";
import { useEmailVerification } from "./useEmailVerification";
import ModalContent from '@/global_components/modal/content/ModalContent';
import ReCAPTCHAComponent from "@/app/recaptcha/ReCAPTCHAComponent";

export default function VerificationModalContent({ emailVerification, onSuccess }: {
    emailVerification: ReturnType<typeof useEmailVerification>
    onSuccess: (value: any) => void,
}) {

    const {
        timeLeft, setTimeLeft,
        emailInput,
        isEmailSending, setEmailSending,
        isSendingSucceed,
        smtpRequest,
        verifyEndpoint,
        timeToResend
    } = emailVerification;

    const codeLength = 6;
    const [codes, setCodes] = useState<string[]>(new Array(codeLength).fill(''));
    const [isInitialSend, setInitialSend] = useState(true);

    // 모달 열릴 때 자동으로 코드 전송 요청
    useEffect(() =>{
        // 남은 시간 초기화
        setTimeLeft(-1);
        if(isInitialSend) {
            smtpRequest();
            setInitialSend(false);
        }
    }, []);

    // 만료까지 남은 시간 안내
    const getTimeText = (): string => {
        if(isEmailSending || !isSendingSucceed) return '';
        if (timeLeft <= 0) return "(만료됨!)";
        return `(${timeLeft}초 후 만료)`;
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

    // 인증코드 서버에 전송
    const submitCode = async () => {
        const code: string = getCode();

        if (code.length < codeLength) {
            Swal.fire('오류', `코드 ${codeLength}자리를 모두 입력해 주세요`, 'warning');
            return;
        }

        apiPost({
            endPoint: verifyEndpoint,
            body: {
                email: emailInput,
                verificationCode: code,
            },
            onSuccess: onSuccess,
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
                        if(timeToResend <= 0) resetContent();
                        smtpRequest();
                    }}
                    disabled={isEmailSending || timeToResend > 0}
                >{timeToResend > 0 ? `재전송 (${timeToResend})` : '재전송'}</button>
                <button
                    className={css.modal_confirm_button}
                    onClick={() => submitCode()}
                >확인</button>
            </div>
        </ModalContent>
    );
}