import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// 리캡챠 사용 훅
export const useRecaptcha = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const executeRecaptcha = async (): Promise<string | null> => {
        try {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset(); // 먼저 자동으로 항상 리셋
                const token = await recaptchaRef.current.executeAsync();
                return token;
            } else {
                return null;
            }
        } catch (error) {
            console.error('reCAPTCHA 실행 오류:', error);
            return null;
        }
    };

    return {
        recaptchaRef,
        executeRecaptcha,
    };
};