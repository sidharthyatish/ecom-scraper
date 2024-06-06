import { createNewPage, getLatestOrders, launchBrowser, login } from "../utils/puppeteerUtil";
import type { Browser, Page } from "puppeteer";
const WEBSITE_NAME = "myntra";

export async function getOrderedProducts() {
  const browser: Browser = await launchBrowser();
  try {
    const newPage = await createNewPage(browser);
    // const homePage = await login(newPage, WEBSITE_NAME);
    const ordersPage = await getLatestOrders(newPage, WEBSITE_NAME);
    
  } catch (error) {
    throw new Error("Failed fetching products");
  }
}
