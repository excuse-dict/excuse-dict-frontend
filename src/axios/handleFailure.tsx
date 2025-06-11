import Swal from "sweetalert2"
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_LOGIN, EP_REFRESH_ACCESS_TOKEN, PG_LOGIN} from "@/app/constants/constants";
import {LoginParams, useAuthState} from "@/app/login/auth/useAuthState";
import {on} from "next/dist/client/components/react-dev-overlay/pages/bus";
import {apiGet} from "@/axios/requests/get/apiGet";
import {apiPatch} from "@/axios/requests/patch/apiPatch";

interface OriginalRequest {
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    endPoint: string,
    params?: object,
    body?: object,
    onSuccess?: (response: any) => void,
    overwriteDefaultOnFail?: boolean,
    onFail?: (error: any) => void,
};

export const getErrorMessage = (error: any) => {
    return error?.response?.data?.body?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "오류가 발생하였습니다.";
}

// 기본 에러 처리 함수
export const onFailDefault = (error: any) => {
    const message: string = getErrorMessage(error);

    Swal.fire("오류", message, 'error');
}

// 에러 처리 메인
export const handleError = ({ isRetry, error, onFail, overwriteDefaultOnFail = true, originalRequest}: {
    isRetry: boolean,
    error: any;
    onFail?: (error: any) => void;
    overwriteDefaultOnFail?: boolean;
    originalRequest: OriginalRequest;

}) => {

    console.log("GET요청 실패(에러): ", error);


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
    window.location.href = PG_LOGIN;
}

// 액세스 토큰 재발급 시도
const handleRefreshAccessToken = (originalRequest: OriginalRequest) => {

    const { refreshToken, login } = {
        refreshToken: useAuthState.getState().refreshToken,
        login: useAuthState.getState().login,
    };

    if(!refreshToken){
        console.log("refreshToken 없음: ", refreshToken);
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
                id: response.data?.data?.id
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
        default:{
            // TODO: PUT/DELETE도 추가
            Swal.fire("오류", "PUT/DELETE에 대한 원 요청 재전송 로직이 설정되지 않았습니다. handleFailure.tsx에 추가해 주세요", "warning");
        }
    }
}