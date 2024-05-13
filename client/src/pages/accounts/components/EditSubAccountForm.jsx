import { useState } from "react";
import { useFormik } from "formik";
import fetchAPI from "../../../lib/fetchAPI";
import { EditSubAccountSchema } from "../../../lib/schemas";
const EditSubAccountForm = ({ account }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: account?.name || "",
      email: account?.email || "",
      user_role: account?.user_role || "",
    },
    validationSchema: EditSubAccountSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      fetchAPI("/auth/update", {
        method: "PUT",
        body: JSON.stringify({ ...values, subaccountId: account._id }),
      })
        .then((data) => {
          console.log("Sub Account updated successfully:", data);
          setSuccess("Sub Account updated successfully!");
          formik.resetForm();
          document.getElementById(account?._id).close();
        })
        .catch((error) => {
          console.error("Error during subaccount updation:", error);
          setError("Subaccount updation failed!");
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
          Update
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

export default EditSubAccountForm;
