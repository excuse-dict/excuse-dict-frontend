export interface AxiosResponseInterface{
    data: unknown,
    status: number,
    statusText: string,
    headers: Record<string, string>,
    config: object,
    request: object,
}