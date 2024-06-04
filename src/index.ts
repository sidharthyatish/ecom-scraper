import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';


(async () => {
  // Launch the browser and open a new blank page
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0');
  // Navigate the page to a URL
  await page.goto('https://www.myntra.com/login/password');
  

  const emailSelector = 'input[type="text"]';
  const passwordSelector = 'input[type="password"]'
  const emailInputSelector = '.I-qZ4M';
  const emailSubmitSelector = '.LSOAQH';
  const loginButtonSelector='.submitButton';

  //click on login
  // await page.click(loginSelector);



  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  await page.type(emailSelector, '');
  await page.type(passwordSelector, '');
  await page.click(loginButtonSelector);
  // Type into search box
  // await page.type('.devsite-search-field', 'automate beyond recorder');

  await page.waitForSelector('.desktop-user');

  await page.goto('https://www.myntra.com/my/orders');

  // // Wait and click on first result
  // const searchResultSelector = '.devsite-result-item-link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.close();
})();