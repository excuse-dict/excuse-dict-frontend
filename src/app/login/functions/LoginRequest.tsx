import { EP_LOGIN } from "@/app/constants/constants"
import { apiPost } from "@/axios/apiPost"

export const sendLoginRequest = async ({ email, password, onSuccess }: {
    email: string,
    password: string,
    onSuccess?: () => void
}) => {
    return await apiPost({
        endPoint: EP_LOGIN,
        body: {
            email: email,
            password: password,
        },
        onSuccess: onSuccess
    })
}