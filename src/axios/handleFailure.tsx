import Swal from "sweetalert2"

export const getErrorMessage = (error: any) => {
    return error?.response?.data?.body?.detail || 
           error?.response?.data?.message || 
           error?.message || 
           "오류가 발생하였습니다.";
}

export const onFailDefault = (error: any) => {
    const message:string = getErrorMessage(error);

    Swal.fire("오류", message, 'error');
}

export const handleError = ({ error, onFail, overwriteDefaultOnFail = true }:{
    error: unknown;
    onFail?: (error: any) => void;
    overwriteDefaultOnFail?: boolean;
}) => {

    console.log("GET요청 실패(에러): ", error);

    // 기본 핸들러 처리
    if(!overwriteDefaultOnFail || !onFail) onFailDefault(error);

    // 전달된 onFail() 실행
    if (onFail) onFail(error);
}