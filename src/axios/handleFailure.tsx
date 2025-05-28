import Swal from "sweetalert2"

export const getErrorMessage = (error: any) => {
    return error.response?.data?.message ?? "오류가 발생하였습니다.";
}

export const onFailDefault = (error: any) => {
    const message:string = getErrorMessage(error);

    Swal.fire("오류", message, 'error');
}

export const handleError = ({ error, onFail }: {
    error: any,
    onFail: any
}) => {

    console.log("GET요청 실패(에러): ", error);
    // 전달된 onFail() 있으면 그거 실행
    if (onFail) {
        onFail(error);
    } else { // 없으면 기본함수 실행
        onFailDefault(error);
    }
}