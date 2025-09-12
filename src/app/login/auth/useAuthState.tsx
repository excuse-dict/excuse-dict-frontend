import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL, EP_LOGIN, PG_HOME} from '@/app/constants/constants';
import {useRouter} from "next/navigation";
import {apiPost} from "@/axios/requests/post/apiPost";

interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    memberId: number | null;
    nickname: string | null;

    login: (params: {
        email: string;
        password: string;
        overwriteDefaultHandler?: boolean;
        onFail?: () => void;
    }) => void,
    logout: () => void;
}

export interface LoginParams {
    accessToken: string;
    refreshToken: string;
    id: number | null,
    nickname: string,
}

export const useAuthState = create<AuthState>()(
    persist(
        (set, get) => {
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
                        const path = getRedirectPath();
                        window.location.href = path;
                    },
                    onFail: onFail
                });
            };

            const getRedirectPath = () => {
                if (typeof window === 'undefined') return PG_HOME;

                const savedPath = sessionStorage.getItem('redirectAfterLogin');
                if (savedPath) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    return savedPath;
                }
                return PG_HOME;
            }

            return {
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null,
                memberId: null,
                nickname: null,
                login: sendLoginRequest,
                logout: () => set({
                    isLoggedIn: false,
                    accessToken: null,
                    refreshToken: null,
                    memberId: null,
                    nickname: null,
                }),
            };
        },
        { name: 'auth-storage' }
    )
);