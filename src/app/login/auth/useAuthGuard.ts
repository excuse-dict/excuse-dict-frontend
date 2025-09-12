import { useAuthState } from '@/app/login/auth/useAuthState';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import {useState} from "react";

export const useAuthGuard = () => {
    const { isLoggedIn } = useAuthState();
    const router = useRouter();

    const [isFirstFocus, setFirstFocus] = useState(true);

    // 로그인 할건지 swal로 물어보기
    // 네 -> true 리턴, 아니오 -> false 리턴
    const requireAuth = (swalMessage?: string) => {
        if (!isLoggedIn) {
            // swal 이 닫히면서 원래 컴포넌트에게 focus를 돌려줌 -> 이 함수 다시 트리거
            // 이 현상으로 swal이 두 번 열리는 것을 방지하기 위한 코드
            if(!isFirstFocus) {
                setFirstFocus(true);
                return false;
            };
            setFirstFocus(!isFirstFocus);

            const currentPath = window.location.pathname + window.location.search;
            // 로그인 성공 후 세션 스토리지에서 꺼내 사용
            sessionStorage.setItem('redirectAfterLogin', currentPath);

            Swal.fire({
                title: '로그인이 필요합니다',
                text: swalMessage || '이 기능을 사용하려면 로그인해주세요.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: '로그인',
                cancelButtonText: '취소',
                heightAuto: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login');
                }
            });
            return false;
        }

        return true;
    };

    return { requireAuth, isLoggedIn };
};