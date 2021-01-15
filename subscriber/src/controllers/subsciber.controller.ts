import "reflect-metadata";
import { PublishModel } from "@app/data/interfaces";
import { controller, httpPost, interfaces, request, requestBody, requestParam, response } from "inversify-express-utils";
import { Request, Response } from "express";

@controller("/subscribe")
export class PublishController implements interfaces.Controller {
  @httpPost("/:topic")
  subscribe(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: PublishModel,
    @requestParam("topic") topic: string,
  ) {
    res.send({
      topic,
      body
    });
  }
}