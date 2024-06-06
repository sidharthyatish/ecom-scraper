import { Browser, Page, Product } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { credentials } from "../config/credentials";
import { websites } from "../config/selectors";
import { Order } from "../types/product";

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0";
const MAX_PRODUCTS = 10;

export async function launchBrowser(): Promise<Browser> {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false , userDataDir: '/tmp/myChromeSession'});
  return browser;
}

export async function createNewPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();  
  await page.setUserAgent(
    USER_AGENT
  );
  await page.setViewport({ width: 1080, height: 1024 });
  return page;
}

export async function login(page: Page, websiteName: keyof typeof websites): Promise<Page> {
  const website = websites[websiteName];
  await page.goto(website.login.url);
  await page.type(website.login.email, credentials.userName);
  await page.type(website.login.password, credentials.passWord);
  await page.click(website.login.submit);
  await page.waitForSelector(website.home.profile);

  return page;
}

async function getProductsInGivenPage(page:Page, brandSelector: string, productNameSelector: string):Promise<Order[]> {
  try{
    return await page.$$eval('.ProductList-details', (products,brandSelector,productNameSelector) => {
      return products.map(product => {
  
        const brandName = product.querySelector(brandSelector)?.textContent;
        const productName = product.querySelector(productNameSelector)?.textContent;
  
        return {
          brandName: brandName || "",
          productName: productName || "",
        }
      });
  
    }, brandSelector,productNameSelector);
  }
  catch(error){
    console.error(`Error getting products in given page : ${error}`);
    return [];
  }
  
  
}
export async function getLatestOrders(page: Page, websiteName: keyof typeof websites) {
  let allProducts:any[] = [];
  try{
    const website = websites[websiteName];
    
    
    let pageNumber = 1;
    await page.goto(website.orders.url);
    await page.waitForSelector(website.orders.pagination);
    const paginationString: string = await page.$eval(`${website.orders.pagination} > span`, span => span.innerText);
    const totalProductCount: number = parseInt(paginationString.split(" ").at(-1) || "0");
    const maxSelectableProductsCount = Math.min(totalProductCount,MAX_PRODUCTS);
  

    while (allProducts.length <maxSelectableProductsCount) {
      await page.goto(website.orders.url+`?p=${pageNumber}`);
      await page.waitForSelector(website.orders.products.item)

      const subSetOfProducts = await getProductsInGivenPage(page, website.orders.products.brand, website.orders.products.name);
      if(subSetOfProducts.length > 0){
        allProducts = allProducts.concat(subSetOfProducts);
        pageNumber++;
      }
      else{
        break;
      }
    }
    
  }
  catch(error){
    console.error(`Error getting latest orders from order page: ${error}`);
    
  }
  
    return allProducts;
}
