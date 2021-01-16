import { Request, Response } from 'express';

export const subscribe = (req: Request, res: Response) => {
  try {
    const { body } = req;

    res.status(200).json({
      msg: `New published message`,
      data: body
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "there was an error " + err })
  }
}