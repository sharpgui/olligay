import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { configure, getLogger } from "log4js";
import config from "./config/index";

configure({
  appenders: { cheese: { type: "file", filename: `${__dirname}/logs/olligay.log` } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

// todo 写一个错误处理中间件
const logger = getLogger('cheese');
const app = new Koa();
const { port, viewDir, memoryFlag, staticDir } = config;
const container = createContainer();
// todo 将controller部分完成
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));

app.use(loadControllers(`${__dirname}/routers/*.ts`));

app.use(bodyParser());
// app.use(serve(staticDir));

app.listen(port, () => {
  console.log(`ollligay🍺🍺🍺，server is running on port ${port}`);
});
