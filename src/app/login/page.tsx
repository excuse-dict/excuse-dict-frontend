'use client'

import {useEffect, useState} from 'react';
import LoginInput from './components/LoginInput';
import {PG_PASSWORD_RESET, PG_REGISTER} from '../constants/constants';
import {useRouter} from 'next/navigation';
import {useAuthState} from "@/app/login/auth/useAuthState";
import {toast} from "react-toastify";
import {isLocalStorageAvailable} from "@/lib/CookieHelper";
import NotAllowedContent from "@/global_components/error-contents/NotAllowedContent";

export default function LoginPage() {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [shouldShowError, setShouldShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [isLoginAvailable, setLoginAvailable] = useState<boolean | null>(null);

    const {sendLoginRequest} = useAuthState();

    useEffect(() => {
        setLoginAvailable(isLocalStorageAvailable());
    }, []);

    const handleLogin = async () => {
        if (isLoading) return;

        setIsLoading(true);
        sendLoginRequest({
            email: emailInput,
            password: passwordInput,
            overwriteDefaultHandler: true,
            onFail: () => {
                setShouldShowError(true);
                setIsLoading(false);
            },
            onSuccess: () => {
                setIsLoading(false);
            }
        })
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('expired') === 'true') {
            toast("로그인 유지 기한이 만료되었습니다. 다시 로그인해 주세요.");
        }
    }, []);

    useEffect(() => {
        if (!shouldShowError) return;
        const timer = setTimeout(() => {
            setShouldShowError(false);
        }, 3000)
        return () => clearTimeout(timer);
    }, [shouldShowError]);

    if (isLoginAvailable === null) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!isLoginAvailable) {
        return (
            <NotAllowedContent
                title={"로그인 이용 불가"}
                subtitle={"로그인 상태를 저장하는 데 쿠키 허용이 필요합니다"}
            />
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">


            <div
                className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div
                        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">로</span>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        로그인
                    </h1>
                    <p className="text-gray-600 text-sm">계정에 로그인하여 서비스를 이용하세요</p>
                </div>

                {/* 입력 폼 */}
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <LoginInput
                            placeholder='이메일'
                            input={emailInput}
                            setInput={setEmailInput}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="relative">
                        <LoginInput
                            placeholder='비밀번호'
                            type='password'
                            input={passwordInput}
                            setInput={setPasswordInput}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>

                {/* 에러 메시지 */}
                <div
                    className={`transition-all duration-300 mb-6 ${shouldShowError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">!</span>
                        </div>
                        <span className="text-red-700 text-sm">이메일 또는 비밀번호가 틀립니다.</span>
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <button
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>로그인 중...</span>
                        </div>
                    ) : (
                        '로그인'
                    )}
                </button>

                {/* 하단 링크들 */}
                <div className="mt-8 space-y-3">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">또는</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200 hover:underline"
                            onClick={() => router.push(PG_PASSWORD_RESET)}
                        >
                            비밀번호를 잊어버리셨나요?
                        </button>
                        <button
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 hover:underline"
                            onClick={() => router.push(PG_REGISTER)}
                        >
                            새 계정 만들기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}