import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  const { keyword = ''} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts keyword={keyword} />
      </main>
    </>
  );
};

export default ProductScreen;
