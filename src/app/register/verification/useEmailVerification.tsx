import { EP_VERIFY_RESET_PASSWORD, EP_VERIFY_SIGNUP, VERIFICATION_CODE_PURPOSE } from "@/app/constants/constants";
import { apiPost } from "@/axios/apiPost";
import sendVerificationCode from "@/axios/requests/post/verificationCode";
import { useEffect, useState } from "react";

export function useEmailVerification(purpose: string) {
    const [emailInput, setEmailInput] = useState('');
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [isEmailSending, setEmailSending] = useState(false);
    const [isSendingSucceed, setSendingSucceed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(-1);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    // 인증코드 검증 API 엔드포인트 결정
    const getVerifyEndpoint = (purpose: string) => {
        switch(purpose){
            case VERIFICATION_CODE_PURPOSE.REGISTRATION:
                return EP_VERIFY_SIGNUP;
            case VERIFICATION_CODE_PURPOSE.RESET_PASSWORD:
                return EP_VERIFY_RESET_PASSWORD;
            default:
                return "";
        };
    }

    const verifyEndpoint: string = getVerifyEndpoint(purpose);

    // 이메일 전송
    const smtpRequest = () => {
        // 이메일 보내는 중...
        setEmailSending(true);
        sendVerificationCode({
            endPoint: verifyEndpoint,
            email: emailInput,
            purpose: purpose,
            recaptchaToken: recaptchaToken,
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

    // 1초마다 코드 만료까지 남은 시간 업데이트
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer); // 클린업
    }, [timeLeft]);

    return {
        emailInput, setEmailInput,
        isEmailVerified, setEmailVerified,
        isEmailSending, setEmailSending,
        isSendingSucceed,
        smtpRequest,
        timeLeft, setTimeLeft,
        verifyEndpoint,
        recaptchaToken, setRecaptchaToken
    }
}