import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from 'react-router-dom';
import { listOrders } from "../../redux/actions/OrderActions";

const OrderMain = () => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage, setOrdersPerPage] = useState(10)

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders = [] } = orderList
  
  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  // calculate products to be display on the current page
  const indexOfLastProduct = currentPage * ordersPerPage
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct)

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(orders.length / ordersPerPage)

  // Handle products per page change
  const handleOrdersPerPageChange = (event) =>
  {
    setOrdersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing products per page
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={ordersPerPage} onChange={handleOrdersPerPageChange}>
                <option value={10}>Show 10 orders</option>
                <option value={20}>Show 20 orders</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {/* {
              loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                <Orders orders={orders} />
              )
            } */}
            {
              loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : orders.length === 0 ? (<p>No orders found</p>) : (
                <Orders orders={currentOrders} />
              )
            }
          </div>
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </Link>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                  <Link className="page-link" to="#" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </Link>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;