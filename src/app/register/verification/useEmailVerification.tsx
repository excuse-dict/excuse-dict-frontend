import {
    EP_VERIFY_RESET_PASSWORD,
    EP_VERIFY_SIGNUP,
    VERIFICATION_CODE_COOLDOWN,
    VERIFICATION_CODE_PURPOSE
} from "@/app/constants/constants";
import sendVerificationCode from "@/axios/requests/post/verificationCode";
import {useEffect, useRef, useState} from "react";
import {useRecaptcha} from "@/app/recaptcha/useRecaptcha";
import {toast} from "react-toastify";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";

export function useEmailVerification({purpose, onViolation}: {
    purpose: string,
    onViolation?: () => void,
}) {

    const [isCheckingAvailability, setCheckingAvailability] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [isEmailSending, setEmailSending] = useState(true);
    const [isSendingSucceed, setSendingSucceed] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState(-1);
    const [timeToResend, setTimeToResend] = useState(0);

    const { recaptchaRef, executeRecaptcha } = useRecaptcha();

    const codeAbortRef = useRef<AbortController | null>(null);

    // 인증코드 검증 API 엔드포인트 결정
    const getVerifyEndpoint = (purpose: string) => {
        switch(purpose){
            case VERIFICATION_CODE_PURPOSE.REGISTRATION:
                return EP_VERIFY_SIGNUP;
            case VERIFICATION_CODE_PURPOSE.RESET_PASSWORD:
                return EP_VERIFY_RESET_PASSWORD;
            default:
                return "";
        }
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
            toast.error(`연달아 코드를 발급하실 수 없습니다. ${timeToResend}초 후에 다시 시도해주세요.`);
            if(onViolation) onViolation();
            return;
        }

        // 리캡챠 토큰 검증
        const recaptchaToken = await executeRecaptcha();
        if (!recaptchaToken) {
            toast.error("보안 검증에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            if(onViolation) onViolation();
            return;
        }

        // 기존 요청과 겹치면 취소
        if(codeAbortRef.current) codeAbortRef.current.abort();

        codeAbortRef.current = new AbortController(); // 후 새것 생성

        // 이메일 전송 시작
        setEmailSending(true);

        await sendVerificationCode({
            email: emailInput,
            purpose: purpose,
            recaptchaToken: recaptchaToken,
            signal: codeAbortRef.current.signal,
            onSuccess: (response: AxiosResponseInterface) => {
                setEmailSending(false); // 이메일 전송 완료!
                setSendingSucceed(true);
                setTimeLeft(calculateTimeLeft(response.data.data.expiryTime));
                setTimeToResend(VERIFICATION_CODE_COOLDOWN);
            },
            onFail: () => {
                setEmailSending(false);
                setSendingSucceed(false);
                setTimeLeft(-1);
                setTimeToResend(0);
                if(onViolation) onViolation();
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

    // 모달 닫을 때 전송중인 요청 중지
    const cancelRequest = () => {
        if(codeAbortRef.current){
            codeAbortRef.current.abort();
            codeAbortRef.current = null;
        }
        // 이건 그대로 두고 보내놓은 요청이 완료되면 콜백이 false로 바꾸게 하는 게 맞음
        // setEmailSending(false);
    }

    return {
        isCheckingAvailability, setCheckingAvailability,
        emailInput, setEmailInput,
        isEmailVerified, setEmailVerified,
        isEmailSending, setEmailSending,
        isSendingSucceed,
        smtpRequest, cancelRequest,
        timeLeft, setTimeLeft,
        verifyEndpoint,
        recaptchaRef,
        executeRecaptcha,
        timeToResend,
        codeAbortRef,
        onViolation
    }
}