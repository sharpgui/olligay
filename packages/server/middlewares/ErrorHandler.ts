import Koa, { Context } from "koa";
import { Logger } from "log4js";

class ErrorHandler {
  static error(app: Koa) {
    interface KOAContext extends Context {
      logger: Logger;
    }
    app.use(async (ctx: KOAContext, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (e) {
        ctx.logger.error(e);
        console.log(e);
        ctx.status = e.status || 500;
        ctx.body = e || "请求出错";
      }
    });

    app.use(async (ctx: KOAContext, next: () => Promise<unknown>) => {
      await next();
      if (404 !== ctx.status) return;
      ctx.logger.error(ctx);
      ctx.status = 404;
      ctx.body = "找不到了🐶";
    });
  }
}

export default ErrorHandler;
