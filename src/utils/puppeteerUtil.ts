import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { credentials } from "../config/credentials";
import { websites } from "../config/selectors";

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

async function getProductsInGivenPage(page:Page) {
  return await page.$$eval('.ProductList-details', products => {
    return products.map(product => {

      const brandName = product.querySelector('.ProductList-bold .Text-Text')?.textContent;
      const productName = product.querySelector('.ProductList-productName .Text-Text')?.textContent;

      return {
        brandName: brandName,
        productName: productName
      }
    });

  });
  
}
export async function getLatestOrders(page: Page, websiteName: keyof typeof websites) {
  let allProducts:any[] = [];
  try{
    const website = websites[websiteName];
    
    
    let pageNumber = 1;
    await page.goto(website.orders.url);
    await page.waitForSelector('.pagination-pagination');
    const paginationString = await page.$eval('.pagination-pagination > span', span => span.innerText);
    const totalProductCount = parseInt(paginationString.split(" ").at(-1) || "0");
    const maxSelectableProductsCount = Math.min(totalProductCount,MAX_PRODUCTS);
  

    while (allProducts.length <maxSelectableProductsCount) {
      await page.goto(website.orders.url+`?p=${pageNumber}`);
      await page.waitForSelector('.ProductList-details')

      const subSetOfProducts = await getProductsInGivenPage(page);
      console.log(`Ordered products : ${JSON.stringify(subSetOfProducts)}`);
      if(subSetOfProducts.length > 0){
        allProducts = allProducts.concat(subSetOfProducts);
        pageNumber++;
      }
      else{
        break;
      }
    }
    

    console.log(`Total products I am gonna return : ${JSON.stringify(allProducts.length)}`);
    
    
  }
  catch(error){
    console.error(`Error getting latest orders : ${error}`);
    
  }
  
    return allProducts;
}
