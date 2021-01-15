import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/index";
import { Container } from "inversify";
import * as bodyParser from 'body-parser';

let container = new Container();
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

const app = server.build();
app.listen(4000);