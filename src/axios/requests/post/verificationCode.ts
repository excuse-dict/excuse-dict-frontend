import { EP_VERIFICATION_CODE_REQ } from "@/app/constants/constants";
import { apiPost } from "@/axios/requests/post/apiPost";
import {AxiosResponseInterface} from "@/axios/interfaces/ResponseInterface";

export default async function sendVerificationCode({ email, purpose, recaptchaToken, signal, onSuccess, onFail }:{
    email: string,
    purpose: string,
    recaptchaToken: string,
    signal: AbortSignal,
    onSuccess?: (value: AxiosResponseInterface) => void,
    onFail?: (value: unknown) => void,
}){
    return await apiPost({
        endPoint: EP_VERIFICATION_CODE_REQ,
        body: {
            email: email,
            purpose: purpose,
            recaptchaToken: recaptchaToken
        },
        signal: signal,
        onSuccess: onSuccess,
        onFail: onFail,
        overwriteDefaultOnFail: false
    });
}