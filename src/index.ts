import { getOrderedProducts } from './scraper/ecomScraper';
(
  async() =>{
    await getOrderedProducts();
  }
)();