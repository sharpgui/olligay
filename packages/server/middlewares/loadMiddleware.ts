import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
// import render from "koa-swig";
import co from "co";
import { resolve } from "path";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { configure, getLogger } from "log4js";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import config from "@config/index";
import ErrorHandler from '@middlewares/ErrorHandler';

const container = createContainer();
const { viewDir, staticDir, env, memoryFlag } = config;
const app = new Koa();

// app.context.render = co.wrap(
//   render<render.DefaultSettings>({
//     root: viewDir,
//     autoescape: true,
//     cache: memoryFlag,
//     writeBody: false,
//     ext: "html",
//   })
// );

// 添加容错处理，日志log
configure({
  appenders: {
    cheese: {
      type: "file",
      filename: resolve(__dirname, "../logs/olligay.log"),
    },
  },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = getLogger("cheese");
ErrorHandler.error(app, logger);

// IOC容器注入
container.loadModules([resolve(__dirname, "../services/*.ts")], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));

app.use(loadControllers(resolve(__dirname, "../controllers/*.ts")));

app.use(bodyParser());

app.use(serve(staticDir));

app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(bodyParser());

  //   initIOC(app);

  //   initLog(app);

  //   initController(app);

  //   initRender(app);
};
