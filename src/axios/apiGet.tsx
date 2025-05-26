import axios from "axios"
import { API_URL } from "../app/constants/constants"
import { onFailDefault } from "./onFail";

export const apiGet = async ({ endPoint, params, onSuccess, onFail }:
    {
        endPoint: string,
        params?: object,
        onSuccess?: (value: any) => void,
        onFail?: (error?: any) => void
    }) => {

    console.log("GET 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params);

    try {
        // 요청 전송
        const response: any = await axios.get(API_URL + endPoint, { params });
        console.log("GET 요청 성공: ", response.data);
        onSuccess?.(response.data);
        return response.data; // 응답 리턴

    } catch (error: any) { // 요청 실패
        console.log("GET요청 실패: ", error);
        // 전달된 onFail() 있으면 그거 실행
        if (onFail) {
            onFail(error);
        } else { // 없으면 기본함수 실행
            onFailDefault(error);
        }
        return null;
    }
}