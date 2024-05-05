import { Link } from "react-router-dom";
import AccountInfo from "./components/AccountInfo";

const Dashboard = () => {
  const features = [
    { display_name: "Shop", link: "/shop" },
    { display_name: "Add Product", link: "/add-product" },
    { display_name: "Edit/Delete Products", link: "/display-products" },
    { display_name: "Orders", link: "/orders" },
    { display_name: "Accounts", link: "/accounts" },
  ];
  return (
    <div className="p-8 space-y-3">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <AccountInfo />

      <div className="grid grid-cols-12 gap-3">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="col-span-3 text-2xl bg-primary text-primary-content px-8 py-16 rounded-2xl"
          >
            {feature.display_name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
