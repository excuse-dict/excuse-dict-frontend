import axios from "axios"
import {API_URL} from "@/app/constants/constants";
import {handleError} from "@/axios/handleFailure";

export const apiPatch = async ({ endPoint, body, onSuccess, onFail, overwriteDefaultOnFail = true }:
                             {
                                 endPoint: string,
                                 body?: object,
                                 onSuccess?: (value: any) => void,
                                 onFail?: (error?: any) => void,
                                 overwriteDefaultOnFail?: boolean,
                             }) => {

    console.log("PATCH 요청 전송: " + API_URL + endPoint);
    console.log("body: ", body);

    try {
        // 요청 전송
        const response: any = await axios.patch(API_URL + endPoint, body );

        // 성공
        console.log("PATCH 요청 성공: ", response.data);
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