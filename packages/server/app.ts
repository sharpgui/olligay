import * as Koa from "koa";
import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interfaces`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
  "@services": `${__dirname}/services`,
});
import config from "@config/index";
import loadMiddleware from "@middlewares/loadMiddleware";

const app = new Koa();

loadMiddleware(app);

app.listen(config.port, () => {
  console.log(`ollligay🍺🍺🍺，server is running on port ${config.port}`);
});
