import axios from "axios"
import { API_URL } from "../constants/constants"
import { onFailDefault } from "./onFail";

export const apiGet = ({ endPoint, params, onSuccess, onFail }:
    {
        endPoint: string,
        params?: object,
        onSuccess?: (value: any) => void,
        onFail?: (error?: any) => void
    }) => {

    console.log("GET 요청 전송: " + API_URL + endPoint);
    console.log("params: ", params);

    // 요청 전송
    axios.get(API_URL + endPoint, { params })
        // 요청 성공
        .then((response: any) => {
            console.log("GET 요청 성공: ", response.data);
            onSuccess?.(response.data);
        })
        // 요청 실패
        .catch((error: any) => {
            console.log("GET요청 실패: ", error);
            // 전달된 onFail() 있으면 그거 실행
            if (onFail) {
                onFail(error);
            } else { // 없으면 기본함수 실행
                onFailDefault(error);
            }
        })
}