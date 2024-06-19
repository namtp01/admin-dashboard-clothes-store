import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, updateProduct } from "../../redux/actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/ProductConstants";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import ColorPicker from "./CustomSelect";
import { listCategories } from "../../redux/actions/CategoryActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const EditProductMain = (props) =>
{
  const { productId } = useParams()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [color, setColor] = useState([])

  const dispatch = useDispatch()

  const productEdit = useSelector((state) => state.productEdit)
  const { loading, error, product } = productEdit

  const categoryList = useSelector(state => state.categoryList)
  const { categories } = categoryList

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() =>
  {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() =>
  {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      toast.success("Product Updated", ToastObjects)
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(editProduct(productId))
      } else {
        setName(product.name)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setImage(product.image)
        setPrice(product.price)
        setColor(product.color)
        setCategory(product.category)
      }
    }
  }, [product, dispatch, productId, successUpdate])

  const submitHandler = (e) =>
  {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId, name, price, description, image, countInStock, color, category
    }))
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>
                  }
                  {
                    loadingUpdate && <Loading />
                  }
                  {
                    loading ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message> : (
                      <>
                        <div className="mb-4">
                          <label htmlFor="product_title" className="form-label">
                            Product title
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_title"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Price
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Count In Stock
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_color" className="form-label">
                            Color
                          </label>
                          <ColorPicker colors={product.color} onChange={(selectedColors) => setColor(selectedColors)} />
                        </div>
                        <div className="mb-4">
                          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value || null)}>
                            <option>All category</option>
                            <option value="">None</option>
                            {
                              categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Description</label>
                          <textarea
                            placeholder="Type here"
                            className="form-control"
                            rows="7"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Images</label>
                          <input
                            className="form-control"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
