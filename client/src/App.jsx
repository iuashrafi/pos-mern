import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/auth/AuthLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/dashboard/AddProduct";
import DisplayProducts from "./pages/dashboard/DisplayProducts";
import Shop from "./pages/shop/Shop";
import Order from "./pages/order/Order";
import Accounts from "./pages/accounts/Accounts";
import Profile from "./pages/accounts/Profile";

function App() {
  return (
    <UserContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<NoPage />} />
              <Route index element={<Home />} />
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="display-products" element={<DisplayProducts />} />
              </Route>
              <Route path="shop" element={<Shop />} />
              <Route path="orders" element={<Order />} />

              {/* Accounts - user roles */}
              <Route path="accounts" element={<Accounts />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </UserContextProvider>
  );
}

export default App;
