import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import morgan from "morgan";

const router = express.Router({
  strict: true
});

router.get('/', (req, res) => {
  res.send("Everything OK!");
});

router.post('/', async (req: Request, res: Response) => {
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
});

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use("/", router);

app.listen(9001, () => console.log("Listening on 9001"))
