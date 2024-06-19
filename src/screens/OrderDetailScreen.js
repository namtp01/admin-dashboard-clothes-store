import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailMain";
import { useParams } from 'react-router-dom';

const OrderDetailScreen = ({match}) => {
  const {orderId} = useParams()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
