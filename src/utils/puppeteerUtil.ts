import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { credentials } from "../config/credentials";
import { myntra } from "../config/selectors";

export async function launchBrowser(): Promise<Browser> {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  return browser;
}

export async function createNewPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0"
  );
  await page.setViewport({ width: 1080, height: 1024 });
  return page;
}

export async function login(page: Page) {
  await page.goto(myntra.login.url);
  await page.type(myntra.login.email, credentials.userName);
  await page.type(myntra.login.password, credentials.passWord);
  await page.click(myntra.login.submit);
}
