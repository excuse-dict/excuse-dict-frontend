import { API_URL } from "@/app/constants/constants";
import { onFailDefault } from "./onFail";
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
        if([200, 201, 204].includes(response.status)){
            console.log("POST 요청 성공: ", response.data);
            onSuccess?.(response.data);
        }else{ // 요청 실패
            console.log("POST 요청 실패: ", response.data);
            onFail?.(response.data)
        }
        return response.data; // 응답 리턴

    } catch (error: any) { // 오류 발생
        console.log("POST요청 실패: ", error);
        // 전달된 onFail() 있으면 그거 실행
        if (onFail) {
            onFail(error);
        } else { // 없으면 기본함수 실행
            onFailDefault(error);
        }
        return null;
    }
}