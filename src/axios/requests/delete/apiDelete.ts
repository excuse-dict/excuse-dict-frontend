import { API_URL } from "@/app/constants/constants";
import { handleError } from "../../handleFailure";
import {useAuthState} from "@/app/login/auth/useAuthState";
import axios from "axios";

export const apiDelete = async ({ endPoint, params, onSuccess, onFail, overwriteDefaultOnFail = true, isRetry = false }: {
    endPoint: string,
    params?: Record<string, any>,
    onSuccess?: (value: any) => void,
    onFail?: (error: any) => void,
    overwriteDefaultOnFail?: boolean,
    isRetry?: boolean,
}) => {

    console.log("DELETE 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params ?? {});

    const token = useAuthState.getState().accessToken;
    const headers = {
        ...(token && { Authorization: token }) // 토큰 있을 때만 추가
    };

    try {
        // 요청 전송
        const response: any = await axios.delete(API_URL + endPoint, {
            headers,
            ...(params && { params })
        });

        // 요청 성공
        console.log("DELETE 요청 성공: ", response);
        onSuccess?.(response);

        return response; // 응답 리턴

    } catch (error: any) { // 오류 발생
        handleError({
            isRetry: isRetry,
            error: error,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail,
            originalRequest: {
                method: "DELETE",
                endPoint: endPoint,
                params: params,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
            }
        })
        return null;
    }
}