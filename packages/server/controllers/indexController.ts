import { Context } from '@interfaces/IKoa';
import { GET, route } from "awilix-koa";

@route("/")
export default class LoginController {
  @GET()
  private async index(
    ctx: Context,
    next: () => Promise<any>
  ): Promise<any> {
    console.log("服务端渲染的");
    let result = await ctx.render("index");
    ctx.body = result.replace('<div id="app"></div>', '<div id="app">olligay🍺</div>');
  }
}
