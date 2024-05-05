import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../lib/schemas";
import fetchAPI from "../../lib/fetchAPI";
import { UserContext } from "../../UserContext";
export const Login = () => {
  // const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setSuccess("");
      setError("");

      fetchAPI("/auth/signin", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((data) => {
          console.log("Login successful:", data);
          setSuccess("Login successfully! Redirecting...");
          formik.resetForm();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.error("Error during logging in:", error);
          setError("Login failed!");
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-96 space-y-3 mx-auto flex flex-col justify-center"
    >
      <h1 className="text-xl text-center font-semibold">Login</h1>
      <label className="form-control w-full">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="label">
            <span className="label-text-alt text-error">
              <span>{formik.errors.email}</span>
            </span>
          </div>
        ) : null}
      </label>
      <label className="form-control w-full">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="label">
            <span className="label-text-alt text-error">
              <span>{formik.errors.password}</span>
            </span>
          </div>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="btn btn-neutral"
      >
        Sign in
      </button>
      {success && (
        <div role="alert" className="alert alert-success text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default Login;
