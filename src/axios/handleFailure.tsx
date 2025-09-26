import Swal from "sweetalert2"
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_LOGIN, EP_REFRESH_ACCESS_TOKEN, PG_LOGIN} from "@/app/constants/constants";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {apiGet} from "@/axios/requests/get/apiGet";
import {apiPatch} from "@/axios/requests/patch/apiPatch";
import {toast} from "react-toastify";
import {apiDelete} from "@/axios/requests/delete/apiDelete";
import {AxiosErrorInterface} from "@/axios/interfaces/ErrorInterface";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";

interface OriginalRequest {
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    endPoint: string,
    params?: Record<string, unknown>,
    body?: object,
    onSuccess?: (response: AxiosResponseInterface) => void,
    overwriteDefaultOnFail?: boolean,
    onFail?: (error: AxiosErrorInterface) => void,
}

export const getErrorMessage = (error: AxiosErrorInterface) => {
    return error?.response?.data?.message ||
        error?.message ||
        "오류가 발생하였습니다.";
}

// 기본 에러 처리 함수
export const onFailDefault = (error: AxiosErrorInterface) => {
    const message: string = getErrorMessage(error);

    toast.error(message);
}

// 에러 처리 메인
export const handleError = ({ isRetry, error, onFail, overwriteDefaultOnFail = true, originalRequest}: {
    isRetry: boolean,
    error: AxiosErrorInterface;
    onFail?: (error: AxiosErrorInterface) => void;
    overwriteDefaultOnFail?: boolean;
    originalRequest: OriginalRequest;

}) => {

    //console.log("GET요청 실패(에러): ", error);

    if (originalRequest.endPoint !== EP_LOGIN
        && ["ACCESS_TOKEN_EXPIRED", "AUTHENTICATION_FAILED"].includes(error?.response?.data?.code)) {
        // 재시도도 실패
        if(isRetry){
            forceLogout();
        }else{
            handleRefreshAccessToken(originalRequest);
        }
        return;
    }

    // 기본 핸들러 처리
    if (!overwriteDefaultOnFail || !onFail) onFailDefault(error);

    // 전달된 onFail() 실행
    if (onFail) onFail(error);
}

// 인증 잘못될 시 강제 로그아웃
const forceLogout = () => {
    useAuthState.getState().logout();
    window.location.href = `${PG_LOGIN}?expired=true`;
}

// 액세스 토큰 재발급 시도
const handleRefreshAccessToken = (originalRequest: OriginalRequest) => {

    const { refreshToken, login, memberId, nickname } = {
        refreshToken: useAuthState.getState().refreshToken,
        login: useAuthState.getState().setStateAfterLogin,
        memberId: useAuthState.getState().memberId,
        nickname: useAuthState.getState().nickname,
    };

    if(!refreshToken){
        //console.log("refreshToken 없음: ", refreshToken);
        forceLogout();
        return;
    }

    apiPost({
        endPoint: EP_REFRESH_ACCESS_TOKEN,
        body: {
            'refreshToken': refreshToken
        },
        onSuccess: (response) => {
            login({
                accessToken: response?.headers?.authorization,
                refreshToken: refreshToken,
                id: memberId,
                nickname: nickname || '',
            })

            // 원 요청 재시도
            retryOriginalRequest(originalRequest);
        },
        overwriteDefaultOnFail: true,
        onFail: () => { // 액세스 토큰 재발급 시도 실패
            forceLogout();
        }
    })
}

// 액세스 토큰 재발급 후 원래 요청 다시 전송
const retryOriginalRequest = (originalRequest: OriginalRequest) => {
    const {method, endPoint, body, params, onSuccess, overwriteDefaultOnFail, onFail} = originalRequest;

    switch (method){
        case "POST":{
            apiPost({
                endPoint: endPoint,
                body: body,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
                isRetry: true,
            })
            break;
        }
        case "GET":{
            apiGet({
                endPoint: endPoint,
                params: params,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
                isRetry: true,
            })
            break;
        }
        case "PATCH":{
            apiPatch({
                endPoint: endPoint,
                body: body,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
                isRetry: true,
            })
            break;
        }
        case "DELETE":{
            apiDelete({
                endPoint: endPoint,
                params: params,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
                isRetry: true,
            })
            break;
        }
        default:{
            // TODO: PUT도 추가
            Swal.fire("오류", "PUT에 대한 원 요청 재전송 로직이 설정되지 않았습니다. handleFailure.tsx에 추가해 주세요", "warning");
        }
    }
}