import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL, EP_LOGIN, PG_HOME} from '@/app/constants/constants';
import {useRouter} from "next/navigation";

interface User {
    email: string;
    nickname: string;
}

interface LoginDto {
    email: string;
    password: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;

    login: (credentials: LoginDto) => Promise<void>;
    logout: () => void;
    setAuthState: (token: string, user: User) => void;
    clearAuthState: () => void;
}

export const useAuth = create<AuthState>()(

    persist(
        (set, get) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            isLoading: false,

            // 로그인
            login: async (credentials: LoginDto) => {
                set({ isLoading: true });

                try {
                    const response = await axios.post(API_URL + EP_LOGIN, credentials, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    // 토큰과 사용자 정보 추출
                    const token = response.headers['authorization']?.replace('Bearer ', '');
                    const userInfo = response.data.data;

                    // 상태 업데이트
                    get().setAuthState(token, userInfo);

                } catch (error: any) {
                    // TODO: 비밀번호가 틀립니다 작게 빨간글씨로
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            // 로그아웃
            logout: () => {
                get().clearAuthState();
            },

            // 로그인 (내부용)
            setAuthState: (token: string, user: User) => set({
                isLoggedIn: true,
                token,
                user
            }),

            // 로그아웃 (내부용)
            clearAuthState: () => set({
                isLoggedIn: false,
                token: null,
                user: null
            }),
        }),
        {
            name: 'auth-storage',
        }
    )
);