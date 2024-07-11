import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BRAND_NAME } from "../data";
import CartContent from "./CartContent";
import fetchAPI from "../lib/fetchAPI";
import { UserContext } from "../UserContext";
import { ShoppingBag, LogOut } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const cartItems = useSelector((state) => state.cart.items);

  const logout = async () => {
    try {
      await fetchAPI("/auth/logout", { method: "POST" });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error during logging out ", error);
    }
  };
  return (
    <div className="navbar glass z-50">
      <div className="navbar-start space-x-2">
        {/* dropdown menu */}
        {/* {user && (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  z-50 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {user?.user_role === "ADMIN" && (
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              )}
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </div>
        )} */}

        {/* Side-drawer for logged in user */}
        {user && (
          <div className="drawer bg-red-30">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-circle drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-[99999] ">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* User Info and Logout button */}
                <div className="bg-gray-200 rounded-full p-2 flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-rose-400 to-red-500 rounded-full btn-circle flex items-center justify-center">
                    <span className="text-xl font-semibold text-white">
                      {user?.name[0]}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-lg block mt-1">{user?.name}</span>
                    <span>Admin</span>
                  </div>
                  <button onClick={logout} className="btn btn-circle">
                    <LogOut />
                  </button>
                </div>

                {/* Links to other pages */}
                <li className="mt-3">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {user?.user_role === "ADMIN" && (
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                )}
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <Link
          to={user ? "/dashboard" : "/"}
          className="btn btn-ghost text-normal"
        >
          {BRAND_NAME}
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        {/* Login and Create Account buttons */}
        {!user && (
          <>
            <Link
              to="/login"
              className="btn btn-ghost font-medium rounded-full"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn text-white bg-theme hover:bg-theme2 rounded-full font-medium"
            >
              Create An Account
            </Link>
          </>
        )}

        {/* Cart Drawer */}
        {user && (
          <>
            <div className="justify-end drawer drawer-end z-[9999]">
              <input
                id="cart-drawer"
                type="checkbox"
                className="drawer-toggle z-[999]"
              />
              <div className="drawer-content">
                <label
                  htmlFor="cart-drawer"
                  className="drawer-button btn btn-circle"
                >
                  <div className="indicator z-0">
                    <ShoppingBag />
                    <span className="badge badge-sm indicator-item badge-secondary">
                      {cartItems.length}
                    </span>
                  </div>
                </label>
              </div>
              <div className="drawer-side z-[9999]">
                <label
                  htmlFor="cart-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="h-full w-96 bg-white z-[9999]">
                  <CartContent />
                </div>
              </div>
            </div>

            {/* <div className="dropdown z-[5000] dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-secondary/50   ">
                  <span className="text-lg block mt-1">{user?.name[0]}</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[5000] p-2 shadow-lg bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/accounts">Accounts</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
