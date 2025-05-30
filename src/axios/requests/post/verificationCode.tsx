import { EP_VERIFICATION_CODE_REQ } from "@/app/constants/constants";
import { apiPost } from "@/axios/apiPost";

export default async function sendVerificationCode({ email, onSuccess, onFail }:{
    email: string,
    onSuccess?: (value: any) => void,
    onFail?: (value: any) => void,
}){
    return await apiPost({
        endPoint: EP_VERIFICATION_CODE_REQ,
        body: {
            email: email,
        },
        onSuccess: onSuccess,
        onFail: onFail
    });
}