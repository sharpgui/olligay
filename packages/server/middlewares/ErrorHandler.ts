import Koa, { Context } from "koa";
import { Logger } from "log4js";

class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    interface KOAContext extends Context {
      logger: Logger;
    }
    app.use(async (ctx: KOAContext, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        console.log(error);
        ctx.status = error.status || 500;
        ctx.body = error || "请求出错";
      }
    });

    app.use(async (ctx: KOAContext, next: () => Promise<unknown>) => {
      await next();
      if (404 !== ctx.status) return;
      ctx.logger.error(ctx);
      ctx.status = 404;
    });
  }
}

export default ErrorHandler;
