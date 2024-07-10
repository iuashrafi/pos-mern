import { useState } from "react";
import { useFormik } from "formik";
import { ProductSchema, EditProductSchema } from "../../../lib/schemas";
import Thumbnail from "../../../components/Thumbnail";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import ThumbnailWithImage from "../../../components/ThumbnailWithImage";
import fetchAPI from "../../../lib/fetchAPI";
import Message from "../../../components/Message";
const EditProductForm = ({ product: p }) => {
  const user = useCurrentUser();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      productName: "" || p.name,
      productCategory: "" || p.category,
      productDesc: "" || p.description,
      productPrice: 0 || p.price,
      // productFile: null,
    },
    validationSchema: EditProductSchema,
    onSubmit: async (values) => {
      alert(
        JSON.stringify(
          {
            ...values,
            // productFile: {
            //   fileName: values.productFile.name,
            //   type: values.productFile.type,
            //   size: `${values.productFile.size} bytes`,
            // },
          },
          null,
          2
        )
      );

      fetchAPI(`/product/edit/${p._id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...values,
        }),
      })
        .then((data) => {
          console.log("Product updated successfully:", data);
          setSuccess("Product updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating product: ", error);
          setError("Product updation failed!");
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 flex flex-col items-center">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Product name</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-accent w-full"
            {...formik.getFieldProps("productName")}
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.productName}</span>
              </span>
            </div>
          ) : null}
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text font-semibold">Product Category</span>
          </div>
          <select
            className="select select-accent w-full "
            {...formik.getFieldProps("productCategory")}
            defaultValue=""
          >
            <option disabled value="">
              Select Category
            </option>
            <option value="Dessert">Dessert</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {formik.touched.productCategory && formik.errors.productCategory ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.productCategory}</span>
              </span>
            </div>
          ) : null}
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text font-semibold">Product price</span>
          </div>
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered input-accent w-full "
            {...formik.getFieldProps("productPrice")}
          />
          {formik.touched.productPrice && formik.errors.productPrice ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.productPrice}</span>
              </span>
            </div>
          ) : null}
        </label>

        {/* <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Product Image</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            // {...formik.getFieldProps("productFile")}
            name="productFile"
            id="productFile"
            onChange={(event) => {
              formik.setFieldValue("productFile", event.currentTarget.files[0]);
              setUploadedImage(event.currentTarget.files[0]);
            }}
          />
          {formik.touched.productFile && formik.errors.productFile ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.productFile}</span>
              </span>
            </div>
          ) : null}
        </label> */}
        {/* display images here */}
        <div>
          {/* <Thumbnail file={uploadedImage} /> */}
          <ThumbnailWithImage product={p} />
        </div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">
              Product Description
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered textarea-accent h-24"
            placeholder="Description"
            {...formik.getFieldProps("productDesc")}
          ></textarea>
          {formik.touched.productDesc && formik.errors.productDesc ? (
            <div className="label">
              <span className="label-text-alt text-error">
                <span>{formik.errors.productDesc}</span>
              </span>
            </div>
          ) : null}
        </label>

        {success && <Message message={success} />}
        {error && <Message message={error} type="error" />}
      </div>
      <button
        type="submit"
        className="btn border-0 bg-theme hover:bg-theme w-full rounded-t-none rounded-b-xl text-white"
      >
        Save
      </button>
    </form>
  );
};

export default EditProductForm;
