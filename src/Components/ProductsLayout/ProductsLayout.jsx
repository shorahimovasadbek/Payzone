import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ProductsLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams({ number: "" });
  return (
    <div>
      <Link to="/products/1">Products 1</Link>
      <br />
      <Link to="/products/2">Products 2</Link>
      <br />
      <Link to="/products/3">Products 3</Link>
      <br />
      <Link to="/products/4">Products 4</Link>
      <br />
      <Link to="/products/5">Products 5</Link>

      <Outlet context={{ hello: "world" }} />

      <h1>{searchParams.get("number")}</h1>
      <input
        type="text"
        value={searchParams.get("number")}
        onChange={(e) => setSearchParams({ number: e.target.value })}
      />
    </div>
  );
};

export default ProductsLayout;
