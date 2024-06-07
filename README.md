#ECOM SCRAPER

## Description
A tool to get the last 10 ordered products from ecom website. This repo makes use of myntra.com.

## Requirements
- Requires node >= v20.11.0
- `npm` and `npx` should be accessible

## Setup
- If you are using nvm, once you are in the project run `nvm use`. The required node version should be installed
- Set the credentials inside `src/config/credentials.ts`
- Build the project using `npm run build`. This should install all the dependencies and compile the TS code into JS
- Run the project using `npm run start`

## Details
- The browser does not run headless. This is because mynta.com requires MFA and we should manually enter it
- Once the program runs, the terminal window contains the list of the ordered products. 