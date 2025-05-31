import axios from "axios"
import { API_URL } from "../app/constants/constants"
import { handleError } from "./handleFailure";

export const apiGet = async ({ endPoint, params, onSuccess, onFail, overwriteDefaultOnFail = true }:
    {
        endPoint: string,
        params?: object,
        onSuccess?: (value: any) => void,
        onFail?: (error?: any) => void,
        overwriteDefaultOnFail: boolean,
    }) => {

    console.log("GET 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params);

    try {
        // 요청 전송
        const response: any = await axios.get(API_URL + endPoint, { params });

        // 성공
        console.log("GET 요청 성공: ", response.data);
        onSuccess?.(response.data);
  
        return response.data; // 응답 리턴

    } catch (error: any) { // 요청 실패(에러)
        handleError({
            error: error,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail
        });    
        return null;
    }
}