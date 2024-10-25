import React from "react";
import { useOutletContext } from "react-router-dom";

const Products = () => {
  const outletObj = useOutletContext();
  return <div>Products {outletObj.hello}</div>;
};

export default Products;
