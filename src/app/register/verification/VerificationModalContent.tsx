import css from './VerificationModalContent.module.css'
import {useEffect, useState} from "react";
import {apiPost} from "@/axios/requests/post/apiPost";
import Swal from "sweetalert2";
import LoadingWidget from "@/global_components/loading/LoadingWidget";
import CodeInput from "@/global_components/input/code/CodeInput";
import {useEmailVerification} from "./useEmailVerification";
import ModalContent from '@/global_components/modal/content/ModalContent';
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_CHECK_EMAIL_AVAILABILITY} from "@/app/constants/constants";
import {useTextLoading} from "@/global_components/loading/hooks/useTextLoading";

export default function VerificationModalContent({emailVerification, onSuccess}: {
    emailVerification: ReturnType<typeof useEmailVerification>
    onSuccess: (value: unknown) => void,
}) {

    const {
        isCheckingAvailability, setCheckingAvailability,
        timeLeft, setTimeLeft,
        emailInput,
        isEmailSending, setEmailSending,
        isSendingSucceed,
        smtpRequest,
        verifyEndpoint,
        timeToResend,
        onViolation,
    } = emailVerification;

    const codeLength = 6;
    const emptyCodes = new Array(codeLength).fill('');
    const [codes, setCodes] = useState<string[]>(emptyCodes);
    const [isInitialSend, setInitialSend] = useState(true);

    // 모달 열릴 때 자동으로 이메일 체크 및 코드 전송 요청
    useEffect(() => {
        checkEmailAvailabilityAndSendVerificationCode();

        if (isInitialSend) setInitialSend(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkEmailAvailabilityAndSendVerificationCode = async () => {
        setCheckingAvailability(true);
        // 모달 상태 초기화
        resetContent();

        // 이메일 중복 확인
        apiGet({
            endPoint: EP_CHECK_EMAIL_AVAILABILITY,
            params: {email: emailInput},
            onSuccess: () => {
                // 사용 가능 이메일 -> 인증 메일 전송
                setCheckingAvailability(false);
                smtpRequest();
            },
            onFail: () => {
                // 사용 불가 이메일
                if (onViolation) onViolation();
            },
            overwriteDefaultOnFail: false,
        });
    }

    // 만료까지 남은 시간 안내
    const getTimeText = (): string => {
        if (isEmailSending || !isSendingSucceed) return '';
        if (timeLeft <= 0) return "(만료됨!)";
        return `(${timeLeft}초 후 만료)`;
    }

    const resetContent = () => {
        setEmailSending(true);
        setTimeLeft(-1);
        setCodes(emptyCodes);
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

    const {loadingText, getDots} = useTextLoading({
        isLoading: true,
        isSucceed: false,
        successText: "",
        failText: "",
        loadingText: "확인 중",
        minTimeLength: 40,
    });

    return (
        <ModalContent align='center'>
            <h2 className={`${css.modal_text} ${css.modal_title}`}>인증 번호 입력</h2>
            {
                isCheckingAvailability ?
                    // 이메일 사용 가능 여부 확인중 표시
                    <div className="fixed bottom-[40%]">
                        <h2 className="font-bold text-2xl mb-4 text-center">
                            <span className="relative inline-block">
                                {loadingText}
                                <span className="absolute left-full whitespace-nowrap">{getDots()}</span>
                            </span>
                        </h2>
                        <LoadingWidget
                            isLoading={true}
                            isSucceed={false}
                            successTitle={""}
                            failTitle={""}
                            loadingTitle={"이메일 사용 가능 여부를 확인하고 있습니다..."}
                        />
                        <p className="mt-8 font-light">✉️ 잠시 기다려주세요 ✉️</p>
                    </div>
                    :
                    // 이후 이메일 인증코드 전송중 표시
                    (
                        <>
                            <LoadingWidget
                                color='grey'
                                isLoading={isEmailSending}
                                isSucceed={isSendingSucceed}
                                loadingTitle='메일 전송 중...'
                                successTitle='메일 전송 완료!'
                                failTitle="메일 전송 실패"
                            ></LoadingWidget>
                            <span className={css.modal_text}>
                                {emailInput} 으로 인증 번호 요청을 전송하였습니다.<br/>
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
                                        if (timeToResend <= 0) resetContent();
                                        smtpRequest();
                                    }}
                                    disabled={isEmailSending || timeToResend > 0}
                                >{timeToResend > 0 ? `재전송 (${timeToResend})` : '재전송'}</button>
                                <button
                                    className={css.modal_confirm_button}
                                    onClick={() => submitCode()}
                                >확인
                                </button>
                            </div>
                        </>
                    )}
        </ModalContent>
    );
}