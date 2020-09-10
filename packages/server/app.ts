import * as Koa from "koa";
import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interfaces`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
  "@services": `${__dirname}/services`,
  "@models": `${__dirname}/models`,
});
import config from "@config/index";
import loadMiddleware from "@middlewares/loadMiddleware";
import createDB from '@models/createDB'

const app = new Koa();

loadMiddleware(app);

createDB('database1');


app.listen(config.port, () => {
  console.log(`ollligay🍺🍺🍺，server is running on port ${config.port}`);
});
