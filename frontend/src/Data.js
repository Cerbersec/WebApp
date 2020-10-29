// Our product database.
const sampleProducts = [
  {
    id: 1,
    name: "Nike Air Presto",
    category: "Clothing and Shoes",
    price: 55,
    description:
      "The Nike Air Presto Women's Shoe delivers the same unrivaled fit and comfort that marked the 2000 debut of the original.",
    popular: true,
    imageUrls: [
      "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/wokkcny4zbhvzobfwc7i/air-presto-womens-shoe-89Tqz1nG.jpg",
      "https://media.hypedc.com/media/catalog/product/cache/1/image/750x/9df78eab33525d08d6e5fb8d27136e95/_/o/_o8a4329_2.jpg"
    ]
  }
];

// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "list"
  },
  {
    name: "Men",
    icon: "group"
  },
  {
    name: "Women",
    icon: "group"
  },
  {
    name: "Boys",
    icon: "group"
  },
  {
    name: "Girls",
    icon: "group"
  },
  {
    name: "Accessories",
    icon: "watch"
  },
];

// Data for rendering menu.
//TODO: move to menu.js and add API call
const dataForTheMenu = [
  { name: "Home page", url: "/", icon: "home", id: 0 },
  {
    name: "Product categories",
    id: 1,
    children: categories.map((x, i) => {
      return {
        name: x.name,
        id: i,
        url: "/?category=" + x.name,
        icon: x.icon
      };
    })
  }
];

export { sampleProducts, categories, dataForTheMenu };
