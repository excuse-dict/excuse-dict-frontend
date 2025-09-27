import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {EP_LOGIN, PG_HOME} from '@/app/constants/constants';
import {apiPost} from "@/axios/requests/post/apiPost";
import {isSessionStorageAvailable} from "@/lib/CookieHelper";

interface AuthState {
    isLoggedIn: boolean,
    accessToken: string | null,
    refreshToken: string | null,
    memberId: number | null,
    nickname: string | null,

    sendLoginRequest: (params: {
        email: string,
        password: string,
        overwriteDefaultHandler?: boolean,
        onFail?: () => void,
    }) => void,
    setStateAfterLogin: (params: LoginParams) => void,
    logout: () => void,
}

export interface LoginParams {
    accessToken: string,
    refreshToken: string,
    id: number | null,
    nickname: string,
}

export const useAuthState = create<AuthState>()(
    persist(
        (set) => {
            const setStateAfterLogin = ({accessToken, refreshToken, id, nickname}: LoginParams) => {
                set({
                    isLoggedIn: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    memberId: id,
                    nickname: nickname
                });
            };

            const sendLoginRequest = async ({ email, password, overwriteDefaultHandler, onFail }: {
                email: string,
                password: string,
                overwriteDefaultHandler?: boolean,
                onFail?: () => void
            }) => {
                return await apiPost({
                    endPoint: EP_LOGIN,
                    body: { email, password },
                    overwriteDefaultOnFail: overwriteDefaultHandler,
                    onSuccess: (response) => {
                        setStateAfterLogin({
                            accessToken: response.headers?.authorization,
                            refreshToken: response.headers?.refresh,
                            id: response.data?.data?.id,
                            nickname: response.data?.data?.nickname,
                        });

                        // 원래 위치로 돌아가기
                        window.location.href = getRedirectPath();
                    },
                    onFail: onFail
                });
            };

            const getRedirectPath = () => {
                if (typeof window === 'undefined') return PG_HOME;

                if(isSessionStorageAvailable()){
                    const savedPath = sessionStorage.getItem('redirectAfterLogin');
                    if (savedPath) {
                        sessionStorage.removeItem('redirectAfterLogin');
                        return savedPath;
                    }
                    return PG_HOME;
                }else{
                    return PG_HOME;
                }
            }

            return {
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null,
                memberId: null,
                nickname: null,
                sendLoginRequest,
                setStateAfterLogin,
                logout: () => {
                    set({
                        isLoggedIn: false,
                        accessToken: null,
                        refreshToken: null,
                        memberId: null,
                        nickname: null,
                    });
                    window.location.href = PG_HOME;
                },
            };
        },
        {
            name: 'auth-storage',
        }
    )
);