import React from "react";
import { useOutletContext, useParams } from "react-router-dom";

const ProductsById = () => {
  const { id } = useParams();
  const outletObj = useOutletContext();
  return (
    <h1>
      Products {id} {outletObj.hello}
    </h1>
  );
};

export default ProductsById;
