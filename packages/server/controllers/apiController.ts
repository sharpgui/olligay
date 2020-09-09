import {GET, route} from 'awilix-koa';
import Router from 'koa-router';
import { IApi } from '@interfaces/IApi';

@route('/api')
export default class ApiController {
    private apiService: IApi
    constructor({apiService}: {apiService: IApi}) {
        this.apiService = apiService;
    }
    @route('/demo')
    @GET()
    async getData(ctx: Router.IRouterContext, next: Promise<void>) {
        const res = await this.apiService.getData('someURL')
        ctx.body = {
            code:0,
            msg:"success",
            data: res
        }
    }
}