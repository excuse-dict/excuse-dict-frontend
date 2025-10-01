import Swal from "sweetalert2";

export const askToLogin = () => {
    Swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 페이지로 이동하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'white',
        cancelButtonColor: 'var(--purple-grey)',
        confirmButtonText: '로그인',
        cancelButtonText: '아니오',
        heightAuto: false,
    }).then((result) => {
        if (result.isConfirmed) {
            // 로그인 페이지로 이동
            window.location.href = '/login';
        }
    });
}