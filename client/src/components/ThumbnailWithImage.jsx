import React from "react";
import { BACKEND_URL } from "../data";
const ThumbnailWithImage = ({ product }) => {
  return (
    <img
      className="h-32 object-contain"
      src={BACKEND_URL + "/" + product.image_url[0]}
      alt={product.name}
    />
  );
};

export default ThumbnailWithImage;
