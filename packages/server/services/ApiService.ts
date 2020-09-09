
export default class ApiService {
    getData(url: string) {
        return new Promise<unknown>((resolve) => {
            resolve({
                item: '我是后台数据🌺',
                result: [1, 'next'],
              });
        })
    }
}