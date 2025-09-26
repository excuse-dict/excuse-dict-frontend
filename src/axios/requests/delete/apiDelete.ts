import { API_URL } from "@/app/constants/constants";
import {handleError} from "../../handleFailure";
import {useAuthState} from "@/app/login/auth/useAuthState";
import axios from "axios";
import {AxiosErrorInterface} from "@/axios/interfaces/ErrorInterface";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";

export const apiDelete = async ({ endPoint, params, onSuccess, onFail, overwriteDefaultOnFail = true, isRetry = false }: {
    endPoint: string,
    params?: Record<string, unknown>,
    onSuccess?: (value: AxiosResponseInterface) => void,
    onFail?: (error: AxiosErrorInterface) => void,
    overwriteDefaultOnFail?: boolean,
    isRetry?: boolean,
}) => {

    /*console.log("DELETE 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params ?? {});*/

    const token = useAuthState.getState().accessToken;
    const headers = {
        ...(token && { Authorization: token }) // 토큰 있을 때만 추가
    };

    try {
        // 요청 전송
        const response: AxiosResponseInterface = await axios.delete(API_URL + endPoint, {
            headers,
            ...(params && { params })
        });

        // 요청 성공
        //console.log("DELETE 요청 성공: ", response);
        onSuccess?.(response);

        return response; // 응답 리턴

    } catch (error: unknown) { // 오류 발생
        handleError({
            isRetry: isRetry,
            error: error as AxiosErrorInterface,
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