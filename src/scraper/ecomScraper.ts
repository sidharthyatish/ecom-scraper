import { createNewPage, getLatestOrders, launchBrowser, login } from "../utils/puppeteerUtil";
import type { Browser, Page } from "puppeteer";
const WEBSITE_NAME = "myntra";

export async function getOrderedProducts() {
  const browser: Browser = await launchBrowser();
  try {
    const newPage = await createNewPage(browser);
    // await login(newPage, WEBSITE_NAME);
    const latestOrders = await getLatestOrders(newPage, WEBSITE_NAME);
    console.log(`Recent orders : ${JSON.stringify(latestOrders)}`);
    
    
  } catch (error) {
    throw new Error("Failed fetching products");
  }
}
