import { API_URL } from "@/app/constants/constants";
import { handleError } from "./handleFailure";
import axios from "axios";
import { headers } from "next/headers";

export const apiPost = async ({ endPoint, body, onSuccess, onFail }: {
    endPoint: string,
    body?: any,
    onSuccess?: (value: any) => void,
    onFail?: (value: any) => void
}) => {

    console.log("POST 요청 전송: " + API_URL + endPoint);
    console.log("body: ", body ?? {});

    try {
        // 요청 전송
        const response: any = await axios.post(API_URL + endPoint, body ?? {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 요청 성공
        console.log("POST 요청 성공: ", response.data);
        onSuccess?.(response.data);

        return response.data; // 응답 리턴

    } catch (error: any) { // 오류 발생
        handleError({
            error: error,
            onFail: onFail
        })
        return null;
    }
}