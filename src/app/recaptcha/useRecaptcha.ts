import {useRef} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// 리캡챠 사용 훅
export const useRecaptcha = () => {

    // 리캡챠 컴포넌트를 조작하기 위한 ref
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const executeRecaptcha = async (): Promise<string | null> => {
        try {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset(); // 먼저 자동으로 항상 리셋
                const token = await recaptchaRef.current.executeAsync();

                if(!token) {
                    // 사용자는 굳이 몰라도 될듯
                    //toast.error("보안 검증에 실패했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해 주세요.")
                    return null;
                }

                return token;
            } else {
                return null;
            }
        } catch {
            //console.error('reCAPTCHA 실행 오류:', error);
            return null;
        }
    };

    return {
        recaptchaRef,
        executeRecaptcha,
    };
};