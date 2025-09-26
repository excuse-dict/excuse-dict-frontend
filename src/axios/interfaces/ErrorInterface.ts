export interface ApiErrorInterface{
    status: number,
    code: string,
    message: string,
}

export interface AxiosErrorInterface{
    message: string,
    name: string,
    code: string,
    status: number,
    response: {
        data: ApiErrorInterface;
        status: number;
    };
}