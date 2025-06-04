import Swal from "sweetalert2"
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_REFRESH_ACCESS_TOKEN, PG_LOGIN} from "@/app/constants/constants";
import {LoginParams, useAuth} from "@/app/login/auth/useAuth";

export const getErrorMessage = (error: any) => {
    return error?.response?.data?.body?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "오류가 발생하였습니다.";
}

export const onFailDefault = (error: any) => {
    const message: string = getErrorMessage(error);

    Swal.fire("오류", message, 'error');
}

export const handleError = ({error, onFail, overwriteDefaultOnFail = true}: {
    error: any;
    onFail?: (error: any) => void;
    overwriteDefaultOnFail?: boolean;
}) => {

    console.log("GET요청 실패(에러): ", error);

    if (error?.response?.data?.code === "ACCESS_TOKEN_EXPIRED") {
        handleRefreshAccessToken({
            onFail: onFail,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
        });
        return;
    }

    // 기본 핸들러 처리
    if (!overwriteDefaultOnFail || !onFail) onFailDefault(error);

    // 전달된 onFail() 실행
    if (onFail) onFail(error);
}

const handleRefreshAccessToken = ({onFail, overwriteDefaultOnFail}: {
    onFail?: (error: any) => void;
    overwriteDefaultOnFail?: boolean;
}) => {

    const { refreshToken, login, logout } = {
        refreshToken: useAuth.getState().refreshToken,
        login: useAuth.getState().login,
        logout: useAuth.getState().logout,
    };

    if(!refreshToken){
        logout();
        //window.location.href = PG_LOGIN;
        console.log("refreshToken 없음: ", refreshToken);
        return;
    }

    try {
        apiPost({
            endPoint: EP_REFRESH_ACCESS_TOKEN,
            body: {
                'refreshToken': refreshToken
            },
            onSuccess: (response) => {
                login({
                    accessToken: response?.headers?.authorization,
                    refreshToken: refreshToken,
                })
            }
        })
    } catch (error) {
        const errorCode = (error as any)?.response?.data?.code;
        if (["REFRESH_TOKEN_EXPIRED", "REFRESH_TOKEN_INVALID"].includes(errorCode)) {
            logout();
            //window.location.href = PG_LOGIN;
            console.log("리프레시 토큰 만료됨");
            return;
        }

        // 기본 핸들러 처리
        if (!overwriteDefaultOnFail || !onFail) onFailDefault(error);

        // 전달된 onFail() 실행
        if (onFail) onFail(error);
    }
}