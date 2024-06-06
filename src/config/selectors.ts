export const websites = {
  myntra: {
    login: {
      url: "https://www.myntra.com/login/password",
      email: 'input[type="text"]',
      password: 'input[type="password"]',
      submit: ".submitButton",
    },
    home: {
      profile: ".desktop-user",
    },
    orders: {
      url: "https://www.myntra.com/my/orders",
      pagination: ".pagination-pagination",
      products: {
        item: ".ProductList-details",
        brand: ".ProductList-bold .Text-Text",
        name: ".ProductList-productName .Text-Text",
      },
    },
  },
};
