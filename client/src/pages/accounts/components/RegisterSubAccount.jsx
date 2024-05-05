import { useState } from "react";
import { useFormik } from "formik";
import { SubAccountSchema } from "../../../lib/schemas";
import fetchAPI from "../../../lib/fetchAPI";
const RegisterSubAccount = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      user_role: "",
    },
    validationSchema: SubAccountSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((data) => {
          console.log("Sub account successful:", data);
          setSuccess("Sub Account Registered successfully!");
          formik.resetForm();
          document.getElementById("create_sub_account").close();
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          setError("Registration failed!");
        });
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="my-4 space-y-3 mx-auto flex flex-col justify-center"
      >
        <label className="form-control w-full">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {formik.errors.name}
              </span>
            </div>
          ) : null}
        </label>
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
        <label className="form-control w-full">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.confirmPassword}</span>
              </span>
            </div>
          ) : null}
        </label>

        <label className="form-control w-full">
          <select
            className="select select-bordered"
            {...formik.getFieldProps("user_role")}
          >
            <option value="" selected>
              Select User Role
            </option>
            <option value="KITCHEN_MANAGER">Kitchen Manager</option>
            <option value="SALES_MANAGER">Sales Manager</option>
            <option value="ORDER_MANAGER">Order Manager</option>
          </select>

          {formik.touched.user_role && formik.errors.user_role ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.user_role}</span>
              </span>
            </div>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn btn-neutral"
        >
          Create
        </button>
      </form>
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
    </>
  );
};

export default RegisterSubAccount;
