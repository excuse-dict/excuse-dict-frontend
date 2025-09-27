/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AxiosResponseInterface{
    data: any,
    status: number,
    statusText: string,
    headers: Record<string, string>,
    config: object,
    request: object,
}