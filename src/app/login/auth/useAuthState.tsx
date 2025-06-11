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
    memberId: number | null;

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
            memberId: null,

            // 로그인
            login: ({accessToken, refreshToken, id}: LoginParams) => {
                set({
                    isLoggedIn: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    memberId: id,
                });
            },

            // 로그아웃
            logout: () => {
                set({
                    isLoggedIn: false,
                    accessToken: null,
                    refreshToken: null,
                    memberId: null,
                })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

useAuthState.subscribe((state) => {
    const hasToken = state.accessToken ? 'exists' : 'null';
    const memberIdValue = state.memberId || 'missing';

    // 상태 변경 알림 (토스트로)
    Swal.fire({
        title: '📊 AUTH STATE CHANGED',
        text: `Member ID: ${memberIdValue}, Token: ${hasToken}`,
        icon: 'info',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });

    if (state.accessToken && !state.memberId) {
        Swal.fire({
            title: '🚨 WEIRD SITUATION',
            text: `Token exists but Member ID is missing! Token: ${hasToken}, Member ID: ${memberIdValue}`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.trace();
    }
});