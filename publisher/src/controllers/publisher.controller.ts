import { controller, httpGet, httpPost, interfaces, request, requestBody, requestParam, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { PublishModel } from "@app/data/interfaces";

@controller("/publish")
export class PublishController implements interfaces.Controller {
  @httpGet("/")
  index(req: Request, res: Response) {
    return res.send({ message: "success ting" });
  }

  @httpPost("/:topic")
  publish(
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