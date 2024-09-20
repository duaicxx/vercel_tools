import runMiddleware from "../middleware/middleware";
import {
  cors,
  ERROR_MESSAGE,
} from "../utils/const";
import { puppeteerOpenBrowser } from "../utils/utils";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  try {
    //get query params
    const { url } = req.query;

    //make request
    const { $ } = await puppeteerOpenBrowser(
      url
    );
    return res.json({
      status: 200,
      content: $.html()
    });
  } catch (err) {
    res.status(404).json({ status: 404, error: err });
  }
}
