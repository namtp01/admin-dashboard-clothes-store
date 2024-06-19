import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditProductMain";
import { useParams } from 'react-router-dom';

const ProductEditScreen = () => {
  const {productId} = useParams()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
