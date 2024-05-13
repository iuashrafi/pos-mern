export const BRAND_NAME = "POS";
export const BACKEND_URL = "http://localhost:3000";

export const dashboardFeatures = [
  { display_name: "Shop", link: "/shop", accessBy: ["ADMIN"] },
  { display_name: "Add Product", link: "/add-product", accessBy: ["ADMIN"] },
  {
    display_name: "Edit/Delete Products",
    link: "/display-products",
    accessBy: ["ADMIN"],
  },
  {
    display_name: "Orders",
    link: "/orders",
    accessBy: ["ADMIN", "KITCHEN_MANAGER"],
  },
  { display_name: "Accounts", link: "/accounts", accessBy: ["ADMIN"] },
];

export const isAccessible = {
  "/shop": ["ADMIN"],
  "/add-product": ["ADMIN"],
  "/display-products": ["ADMIN"],
  "/orders": ["ADMIN", "KITCHEN_MANAGER"],
  "/accounts": ["ADMIN"],
};

export const productCategories = [
  { label: "All", value: "ALL" },
  { label: "Dessert", value: "Dessert" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
];
