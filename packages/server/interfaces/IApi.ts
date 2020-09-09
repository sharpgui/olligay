export interface IApi {
    getData(url: string): Promise<Object>
}