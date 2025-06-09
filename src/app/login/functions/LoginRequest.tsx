import {EP_LOGIN, PG_HOME} from "@/app/constants/constants"
import { apiPost } from "@/axios/requests/post/apiPost"
import {LoginParams, useAuthState} from "@/app/login/auth/useAuthState";
import {useRouter} from "next/navigation";

export const sendLoginRequest = async ({ email, password, overwriteDefaultHandler, login, onFail }: {
    email: string,
    password: string,
    overwriteDefaultHandler?: boolean,
    login: (value: LoginParams) => void,
    onFail?: () => void
}) => {

    return await apiPost({
        endPoint: EP_LOGIN,
        body: {
            email: email,
            password: password,
        },
        overwriteDefaultOnFail: overwriteDefaultHandler,
        onSuccess: (response) => {
            login({
                accessToken: response.headers?.authorization,
                refreshToken: response.headers?.refresh,
                id: response.data?.data?.id,
            });
            window.location.href = PG_HOME;
        },
        onFail: onFail
    })
}