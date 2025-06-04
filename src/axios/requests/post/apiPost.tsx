import { API_URL } from "@/app/constants/constants";
import { handleError } from "../../handleFailure";
import {useAuth} from "@/app/login/auth/useAuth";
import axios from "axios";

export const apiPost = async ({ endPoint, body, onSuccess, onFail, overwriteDefaultOnFail = true }: {
    endPoint: string,
    body?: any,
    onSuccess?: (value: any) => void,
    onFail?: (error: any) => void,
    overwriteDefaultOnFail?: boolean,
}) => {

    console.log("POST 요청 전송: " + API_URL + endPoint);
    console.log("body: ", body ?? {});

    const token = useAuth.getState().accessToken;
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }) // 토큰 있을 때만 추가
    };

    try {
        // 요청 전송
        const response: any = await axios.post(API_URL + endPoint, body ?? {}, { headers });

        // 요청 성공
        console.log("POST 요청 성공: ", response);
        onSuccess?.(response);

        return response; // 응답 리턴

    } catch (error: any) { // 오류 발생
        handleError({
            error: error,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail
        })
        return null;
    }
}