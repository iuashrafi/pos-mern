import { Link, useNavigate } from "react-router-dom";
import AccountInfo from "./components/AccountInfo";
import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { dashboardFeatures } from "../../data";
import { Store, Soup, Users, ScrollText, LayoutGrid } from "lucide-react";
import TypographyH1 from "../../components/typography/TypographyH1";

// features icons
const FeatureIcon = ({ display_name }) => {
  if (display_name === "Shop") {
    return <Store size={38} />;
  } else if (display_name === "Add Product") {
    return <Soup size={38} />;
  } else if (display_name === "Display Products") {
    return <LayoutGrid size={38} />;
  } else if (display_name === "Orders") {
    return <ScrollText size={38} />;
  } else if (display_name === "Accounts") {
    return <Users size={38} />;
  } else {
    return <>Icon</>;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);

  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }
  }, [user, ready]);

  const userFeatures = dashboardFeatures.filter((feature) =>
    feature.accessBy.includes(user?.user_role)
  );

  return (
    <div className="space-y-3 p-4">
      <TypographyH1>Dashboard</TypographyH1>
      <AccountInfo />

      <div className="grid grid-cols-12 gap-3">
        {userFeatures.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 text-2xl bg-gradient-to-b from-theme2 to-theme text-white hover:shadow-lg px-8 py-16 rounded-2xl flex items-center justify-between space-x-4"
          >
            <span>{feature.display_name}</span>
            <span className="">
              <FeatureIcon display_name={feature.display_name} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
