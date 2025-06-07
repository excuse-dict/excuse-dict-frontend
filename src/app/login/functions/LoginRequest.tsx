import { EP_LOGIN } from "@/app/constants/constants"
import { apiPost } from "@/axios/requests/post/apiPost"

export const sendLoginRequest = async ({ email, password, onSuccess, onFail }: {
    email: string,
    password: string,
    onSuccess?: (response: any) => void
    onFail?: () => void
}) => {
    return await apiPost({
        endPoint: EP_LOGIN,
        body: {
            email: email,
            password: password,
        },
        onSuccess: onSuccess,
        onFail: onFail
    })
}