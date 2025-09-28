import {API_URL} from "@/app/constants/constants"
import {handleError} from "../../handleFailure";
import {useAuthState} from "@/app/login/auth/useAuthState";
import axios from "axios";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";
import {AxiosErrorInterface} from "@/axios/interfaces/ErrorInterface";

export const apiGet = async ({ endPoint, params, onSuccess, onFail, overwriteDefaultOnFail = true, isRetry = false }:
    {
        endPoint: string,
        params?: Record<string, unknown>,
        onSuccess?: (value: AxiosResponseInterface) => void,
        onFail?: (error: AxiosErrorInterface) => void,
        overwriteDefaultOnFail?: boolean,
        isRetry?: boolean,
    }) => {

    console.log("GET 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params);

    const token = useAuthState.getState().accessToken;
    const headers = token ? { Authorization: token } : {};

    //console.log("headers: ", headers);

    try {
        // 요청 전송
        const response: AxiosResponseInterface = await axios.get(API_URL + endPoint, { params, headers });

        // 성공
        console.log("GET 요청 성공: ", response);
        onSuccess?.(response);
  
        return response; // 응답 리턴

    } catch (error: unknown) { // 요청 실패(에러)
        handleError({
            isRetry: isRetry,
            error: error as AxiosErrorInterface,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail,
            originalRequest: {
                method: "GET",
                endPoint: endPoint,
                params: params,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
            }
        });    
        return null;
    }
}