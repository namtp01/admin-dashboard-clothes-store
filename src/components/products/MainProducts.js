import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../redux/actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () =>
{
  const [keyword, setKeyword] = useState("")

  const dispatch = useDispatch()

  let navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { error: errorDelete, success: successDelete } = productDelete

  useEffect(() =>
  {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword, successDelete])

  // calculate products to be display on the current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(products.length / productsPerPage)

  // Handle products per page change
  const handleProductsPerPageChange = (event) =>
  {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing products per page
  };

  const submitHandler = (e) =>
  {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products ({products.length})</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              {/* <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              /> */}
              <form onSubmit={submitHandler} className="input-group-search">
                <input
                  type="search"
                  className="form-control rounded search"
                  placeholder="Find Products ..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="search-button">
                  search
                </button>
              </form>
            </div>
            
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div> */}
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={productsPerPage} onChange={handleProductsPerPageChange}>
                <option value={10}>Show 10 products</option>
                <option value={20}>Show 20 products</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>)}
          {
            loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
              // <div className="row">
              //   {/* Products */}
              //   {products.map((product) => (
              //     <Product product={product} key={product._id} />
              //   ))}
              // </div>
              <div className="row">
                {/* Products */}
                {currentProducts.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            )
          }

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {/* <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li> */}
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

export default MainProducts;
