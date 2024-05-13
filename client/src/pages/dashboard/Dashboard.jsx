import { Link } from "react-router-dom";
import AccountInfo from "./components/AccountInfo";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { dashboardFeatures } from "../../data";
const Dashboard = () => {
  const { user } = useContext(UserContext);

  const userFeatures = dashboardFeatures.filter((feature) =>
    feature.accessBy.includes(user?.user_role)
  );
  return (
    <div className="p-8 space-y-3">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <AccountInfo />

      <div className="grid grid-cols-12 gap-3">
        {userFeatures.map((feature, index) => (
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
