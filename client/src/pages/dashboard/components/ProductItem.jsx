import { useState } from "react";
import DialogWrapper from "./DialogWrapper";
import EditProductForm from "./EditProductForm";

const ProductItem = ({ product: p }) => {
  return (
    <li className="border-b last:border-0 py-3 text-lg  flex justify-between">
      <span>{p.name}</span>
      <div className="flex space-x-2">
        <DialogWrapper btn="Edit" title="Edit - " obj={p}>
          <EditProductForm product={p} />
        </DialogWrapper>
        <button className="btn btn-link">Delete</button>
      </div>
    </li>
  );
};

export default ProductItem;
