import runMiddleware from "../middleware/middleware";
import {
  cors,
  ERROR_MESSAGE,
} from "../utils/const";
import { puppeteerOpenBrowser } from "../utils/utils";
const { chromium } = require('playwright');
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  try {
    //get query params
    const { url } = req.query;

    //make request
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();
    return res.json({
      status: 200,
      content: content
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({ status: 404, error: err });
  }
}
