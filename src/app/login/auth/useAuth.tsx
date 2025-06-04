import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL, EP_LOGIN, PG_HOME} from '@/app/constants/constants';
import {useRouter} from "next/navigation";

interface LoginDto {
    email: string;
    password: string;
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;

    login: (credentials: LoginDto) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthState>()(

    persist(
        (set, get) => ({
            isLoggedIn: false,
            token: null,

            // 로그인
            login: async (credentials: LoginDto) => {
                try {
                    const response = await axios.post(API_URL + EP_LOGIN, credentials);

                    const token = response.headers['authorization'];

                    console.log("login response: ", response);
                    console.log("token: ", token);

                    set({
                        isLoggedIn: true,
                        token: token
                    });

                } catch (error: any) {
                    // TODO: 비밀번호가 틀립니다 작게 빨간글씨로
                    throw error;
                }
            },

            // 로그아웃
            logout: () => {
                set({
                    isLoggedIn: false,
                    token: null,
                })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);