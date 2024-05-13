import { useState } from "react";
import DialogWrapper from "./DialogWrapper";
import EditProductForm from "./EditProductForm";
import { BACKEND_URL } from "../../../data";
import fetchAPI from "../../../lib/fetchAPI";

const ProductItem = ({ product: p }) => {
  const handleProductDelete = (productId) => {
    fetchAPI(`/product/${productId}`, {
      method: "DELETE",
    })
      .then((data) => {
        console.log("Product deleted successfully", data);
      })
      .catch((error) => {
        console.error("Error during product deletion:", error);
      });
  };
  return (
    <li className="border-b last:border-0 py-3 text-lg grid grid-cols-12">
      <div className="col-span-2">
        <img
          className="rounded-lg object-contain"
          src={BACKEND_URL + "/" + p?.image_url[0]}
        />
      </div>
      <div className="col-span-10 px-6">
        <span className="text-lg font-semibold">{p.name}</span>
        <div className="flex space-x-2">
          <DialogWrapper btn="Edit" title="Edit Product - " obj={p}>
            <EditProductForm product={p} />
          </DialogWrapper>
          <button
            className="btn btn-link"
            onClick={() => {
              handleProductDelete(p._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
