import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../../UserContext";
import Loading from "../../components/Loading";
import { ProductSchema } from "../../lib/schemas";
import Thumbnail from "../../components/Thumbnail";
import Message from "../../components/Message";
import { isAccessible } from "../../data";
import ProductPreview from "./components/ProductPreview";
import TypographyH1 from "../../components/typography/TypographyH1";
const AddProduct = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    // check for user
    if (!user && ready) {
      navigate("/login");
    }

    // check for user's permission to access the current page/Component
    if (
      user &&
      isAccessible["/add-product"].includes(user.user_role) === false
    ) {
      navigate("/dashboard");
    }
  }, [user, ready, navigate]);

  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }

    // check for user's permission to access the current page/Component
    if (
      user &&
      isAccessible["/add-product"].includes(user.user_role) === false
    ) {
      navigate("/dashboard");
    }
  }, [user, ready, navigate]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productCategory: "",
      productPrice: 0,
      productDesc: "",
      productFile: null,
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      alert(
        JSON.stringify(
          {
            ...values,
            productFile: {
              fileName: values.productFile.name,
              type: values.productFile.type,
              size: `${values.productFile.size} bytes`,
            },
          },
          null,
          2
        )
      );

      const formData = new FormData();
      formData.append("owner_id", user._id);
      formData.append("user_id", user._id);
      formData.append("name", values.productName);
      formData.append("description", values.productDesc);
      formData.append("price", values.productPrice);
      formData.append("category", values.productCategory);
      //   formData.append("stocks", values.stocks);
      //   formData.append("availability", values.availability);
      //   formData.append("more_details", JSON.stringify(values.more_details));
      formData.append("productFile", values.productFile); // Append the file to FormData

      console.log("formData= ", formData);

      // Log FormData contents
      for (const entry of formData.entries()) {
        console.log(entry);
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/product/add_product",
          {
            method: "POST",
            body: formData,
            headers: {
              //   "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Product saved successfully:", data);
        setSuccess("Product created successfully!");
        formik.resetForm();
      } catch (error) {
        console.error("Error saving product:", error);
        setError("Error creating product! Try again later.");
      }
    },
  });

  // Display loading indicator while the application is loading
  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="p-8 bg-white border rounded-xl grid grid-cols-12">
      <div className="col-span-6">
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <TypographyH1>Add Product</TypographyH1>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered input-accent w-full max-w-xs"
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

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Category</span>
            </div>
            <select
              className="select select-accent w-full max-w-xs"
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

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product price</span>
            </div>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered input-accent w-full max-w-xs"
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

          <label className="form-control w-full max-w-xs">
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
                formik.setFieldValue(
                  "productFile",
                  event.currentTarget.files[0]
                );
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
          </label>
          {/* display images here */}
          <div>
            <Thumbnail file={uploadedImage} />
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Description</span>
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
          <button type="submit" className="btn btn-accent text-white">
            Save
          </button>
          {success && <Message message={success} />}
          {error && <Message message={error} type="error" />}
        </form>
      </div>
      <div className="col-span-6 flex flex-col">
        <TypographyH1>Preview</TypographyH1>
        <ProductPreview product={formik.values} file={uploadedImage} />
      </div>
    </div>
  );
};

export default AddProduct;
