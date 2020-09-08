import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
import { resolve } from "path";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { configure, getLogger } from "log4js";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import config from "@config/index";
import ErrorHandler from "@middlewares/ErrorHandler";

const { staticDir } = config;

// IOC容器注入
const initIOC = (app: Koa) => {
  const container = createContainer();
  container.loadModules([resolve(__dirname, "../services/*.ts")], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    },
  });
  app.use(scopePerRequest(container));
};

// 添加容错处理，日志log
const initLog = (app: Koa) => {
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
  app.context.logger = logger
  ErrorHandler.error(app);
};

// 配置路由
const initController = (app: Koa) => {
  app.use(loadControllers(resolve(__dirname, "../controllers/*.ts")));
  app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));
};

// 渲染逻辑，后期react同构SSR
const initRender = (app: Koa) => {
  app.use(serve(staticDir));
}

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(bodyParser());
  initIOC(app);
  initLog(app);
  initController(app);
  initRender(app);
};
