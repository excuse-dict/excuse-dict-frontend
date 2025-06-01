import {
    EP_VERIFY_RESET_PASSWORD,
    EP_VERIFY_SIGNUP,
    VERIFICATION_CODE_COOLDOWN,
    VERIFICATION_CODE_PURPOSE
} from "@/app/constants/constants";
import { apiPost } from "@/axios/apiPost";
import sendVerificationCode from "@/axios/requests/post/verificationCode";
import { useEffect, useState } from "react";
import {useRecaptcha} from "@/app/recaptcha/useRecaptcha";
import Swal from "sweetalert2";

export function useEmailVerification(purpose: string) {
    const [emailInput, setEmailInput] = useState('');
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [isEmailSending, setEmailSending] = useState(true);
    const [isSendingSucceed, setSendingSucceed] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState(-1);
    const [timeToResend, setTimeToResend] = useState(0);

    const { recaptchaRef, executeRecaptcha } = useRecaptcha();

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

    // 1초마다 timeToResend 업데이트
    useEffect(() => {
        if(timeToResend > 0){
            const timer = setTimeout(() => {
                setTimeToResend(timeToResend - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeToResend]);

    // 이메일 전송
    const smtpRequest = async () => {

        // 쿨다운 경과했는지 검증
        if(timeToResend > 0){
            Swal.fire("오류", `연달아 코드를 발급하실 수 없습니다. ${timeToResend}초 후에 다시 시도해주세요.`, 'warning');
            return;
        }

        // 리캡챠 토큰 검증
        const recaptchaToken = await executeRecaptcha();
        if (!recaptchaToken) return;

        // 이메일 전송 시작
        setTimeToResend(VERIFICATION_CODE_COOLDOWN);
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
            onFail: (error) => {
                setEmailSending(false);
                setSendingSucceed(false);
                setTimeLeft(-1);
            },
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
        recaptchaRef,
        executeRecaptcha,
        timeToResend,
    }
}