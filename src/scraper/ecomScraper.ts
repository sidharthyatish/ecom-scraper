import { createNewPage, getLatestOrders, launchBrowser, login } from "../utils/puppeteerUtil";
import type { Browser } from "puppeteer";
const WEBSITE_NAME = "myntra";

export async function getOrderedProducts() {
  const browser: Browser = await launchBrowser();
  try {
    const page = await createNewPage(browser);
    await login(page, WEBSITE_NAME);
    const latestOrders = await getLatestOrders(page, WEBSITE_NAME);
    console.log(`Recent orders : ${JSON.stringify(latestOrders)}`);
  } catch (error) {
    throw new Error("Failed fetching products");
  } finally {
    await browser.close();
  }
}
