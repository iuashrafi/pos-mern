import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, IndianRupee, CircleCheck, CircleX } from "lucide-react";
import screenshot from "../assets/POS.png";
import Footer from "../components/Footer";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // if user exists/logged in then navigate to dashboard page
  if (user) {
    return navigate("/dashboard");
  }

  return (
    <>
      <div className="flex flex-col p-16 items-center justify-center bg-green-30">
        <div className=" flex flex-col items-center bg-red-30 mt-16 mb-32">
          <h1 className="font-poppins font-medium text-6xl text-center">
            Your Gateway To <br />
            Affordable POS
          </h1>
          <h2 className="font-normal text-lg mt-4">
            Providing affordable POS solutions to help you manage your business
          </h2>
          <div className="space-x-4 mt-8">
            <Link
              to="/register"
              className="btn bg-theme hover:bg-[#635bff] hover:shadow-md text-white rounded-full font-poppins font-medium"
            >
              Get Started <ArrowUpRight />
            </Link>
            <Link to="/" className="btn rounded-full ">
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="bg-white">
          <div className="mockup-browser border-base-300 border">
            <div className="mockup-browser-toolbar">
              <div className="input border-base-300 border">
                https://pos.com
              </div>
            </div>
            <div className="border-base-300 flex justify-center border-t px-4 py-16">
              <img src={screenshot} alt="screenshot" />
            </div>
          </div>
        </div>

        <div className="mt-32 mb-16 bg-red-20">
          <div className="font-poppins text-2xl font-medium text-center py-8">
            Pricing
          </div>
          <div className="flex space-x-8">
            <div className="card bg-base-100 w-80 shadow-xl">
              <div className="bg-blue-30 pt-12 pb-6 flex items-baseline justify-center ">
                <IndianRupee size={54} />
                <span className="text-6xl font-semibold">0</span>
                <span>/month</span>
              </div>
              <div className="flex justify-center">
                <button className="btn rounded-2xl text-white font-medium font-poppins bg-theme hover:bg-theme2">
                  Get Started
                </button>
              </div>
              <div className="card-body bg-green-3 mt-4 border-t">
                <ul className="space-y-1">
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Cloud-based point of sale</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Only 1 Account</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleX className="text-gray-500" />
                    <span className="text-base">Customer database</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleX className="text-gray-500" />
                    <span className="text-base">Payment Processing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 w-80 shadow-xl">
              <div className="bg-blue-30 pt-12 pb-6 flex items-baseline justify-center ">
                <IndianRupee size={54} />
                <span className="text-6xl font-semibold">800</span>
                <span>/month</span>
              </div>
              <div className="flex justify-center">
                <button className="btn rounded-2xl text-white font-medium font-poppins bg-theme hover:bg-theme2">
                  Get Started
                </button>
              </div>
              <div className="card-body bg-green-3 mt-4 border-t">
                <ul className="space-y-1">
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Cloud-based point of sale</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Upto 2 Accounts</span>
                  </li>

                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Payment Processing</span>
                  </li>

                  <li className="flex space-x-2">
                    <CircleX className="text-gray-500" />
                    <span className="text-base">Customer database</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 w-80 shadow-xl">
              <div className="bg-blue-30 pt-12 pb-6 flex items-baseline justify-center ">
                <IndianRupee size={54} />
                <span className="text-6xl font-semibold">---</span>
                <span>/month</span>
              </div>
              <div className="flex justify-center">
                <button className="btn rounded-2xl text-white font-medium font-poppins bg-theme hover:bg-theme2">
                  Contact Sales
                </button>
              </div>
              <div className="card-body bg-green-3 mt-4 border-t">
                <ul className="space-y-1">
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Cloud-based point of sale</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Upto 10 Accounts</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Customer database</span>
                  </li>
                  <li className="flex space-x-2">
                    <CircleCheck className="text-green-500" />
                    <span className="text-base">Payment Processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
