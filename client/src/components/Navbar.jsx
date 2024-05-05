import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BRAND_NAME } from "../data";
import { useCurrentUser } from "../hooks/useCurrentUser";
import CartIcon from "./CartIcon";
import CartContent from "./CartContent";
import fetchAPI from "../lib/fetchAPI";
import { UserContext } from "../UserContext";
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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-product">Add Products</Link>
            </li>
            <li>
              <Link to="/display-products">Display Products</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-normal">
          {BRAND_NAME}
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        {!user && (
          <>
            <Link to="/login" className="btn btn-ghost text-normal">
              Login
            </Link>
            <Link to="/register" className="btn btn-neutral text-normal">
              Create an account
            </Link>
          </>
        )}
        {user && (
          <>
            {/* <CartIcon /> */}

            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn">
                  <div className="indicator">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item badge-secondary">
                      {cartItems.length}
                    </span>
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="min-h-full p-4 w-80 bg-base-100">
                  <CartContent />
                </div>
              </div>
            </div>

            <div className="dropdown z-[5000] dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3  z-[5000] p-2 shadow-lg bg-base-100 rounded-box w-52"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
