import {API_URL} from "@/app/constants/constants";
import {handleError} from "../../handleFailure";
import {useAuthState} from "@/app/login/auth/useAuthState";
import axios from "axios";
import {AxiosErrorInterface} from "@/axios/interfaces/ErrorInterface";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";

export const apiPost = async ({endPoint, body, onSuccess, onFail, overwriteDefaultOnFail = true, isRetry = false}: {
    endPoint: string,
    body?: object,
    onSuccess?: (value: AxiosResponseInterface) => void,
    onFail?: (error: AxiosErrorInterface) => void,
    overwriteDefaultOnFail?: boolean,
    isRetry?: boolean,
}) => {

    /*console.log("POST 요청 전송: " + API_URL + endPoint);
    console.log("body: ", body ?? {});*/

    const token = useAuthState.getState().accessToken;
    const headers = {
        'Content-Type': 'application/json',
        ...(token && {Authorization: token}) // 토큰 있을 때만 추가
    };

    try {
        // 요청 전송
        const response: AxiosResponseInterface = await axios.post(
            API_URL + endPoint,
            body ?? {},
            {
                headers,
                withCredentials: true   // 쿠키 포함
            });

        // 요청 성공
        console.log("POST 요청 성공: ", response);
        onSuccess?.(response);

        return response; // 응답 리턴

    } catch (error: unknown) { // 오류 발생
        handleError({
            isRetry: isRetry,
            error: error as AxiosErrorInterface,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail,
            originalRequest: {
                method: "POST",
                endPoint: endPoint,
                body: body,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
            }
        })
        return null;
    }
}