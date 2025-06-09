import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL, EP_LOGIN, PG_HOME} from '@/app/constants/constants';
import {useRouter} from "next/navigation";

interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    id: number | null;

    login: (params: LoginParams) => void,
    logout: () => void;
}

export interface LoginParams {
    accessToken: string;
    refreshToken: string;
    id: number,
}

export const useAuthState = create<AuthState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            id: null,

            // 로그인
            login: ({accessToken, refreshToken, id}: LoginParams) => {
                set({
                    isLoggedIn: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    id: id,
                });
            },

            // 로그아웃
            logout: () => {
                set({
                    isLoggedIn: false,
                    accessToken: null,
                    refreshToken: null,
                    id: null,
                })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);