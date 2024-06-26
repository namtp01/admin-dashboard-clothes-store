import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/ProductConstants";
import { createProduct } from "../../redux/actions/ProductActions";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import ColorPicker from "./CustomSelect";
import { listCategories } from "../../redux/actions/CategoryActions";
import { uploadProductImage } from "../../redux/actions/ImageActions";
import { IMAGE_UPLOAD_RESET } from "../../redux/constants/ImageConstatns";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

// const generateCategoryTree = (categories, parent = null) => {
//   return categories
//     .filter(category => category.parent === parent)
//     .map(category => ({
//       value: category._id,
//       label: category.name,
//       children: generateCategoryTree(categories, category._id)
//     }));
// }

const AddProductMain = () =>
{
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  // const [color, setColor] = useState([])
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch()
  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, product } = productCreate

  const productImageUpload = useSelector((state) => state.productImageUpload)
  const { loading: loadingUpload, error: errorUpload, imageUrl } = productImageUpload

  const categoryList = useSelector(state => state.categoryList)
  const { categories = [] } = categoryList || {}

  useEffect(() =>
  {
    dispatch(listCategories())
  }, [dispatch])

  //const categoryTree = generateCategoryTree(categories);

  const parentCategories = categories.filter((category) => !category.parent)

  useEffect(() =>
  {
    if (product) {
      toast.success("Product Added", ToastObjects)
      dispatch({ type: PRODUCT_CREATE_RESET })
      setName("")
      setDescription("")
      setCountInStock(0)
      setImage(null)
      setPrice(0)
      setCategory("")
      // setColor([])
      dispatch({ type: IMAGE_UPLOAD_RESET })
    }
  }, [product, dispatch])

  const handleImageChange = (e) =>
  {
    setImage(e.target.files[0])
  }

  const handleUpload = async () =>
  {
    if (image) {
      setIsUploading(true)
      await dispatch(uploadProductImage(image))
      setIsUploading(false)
    }
  }

  useEffect(() =>
  {
    if (imageUrl) {
      dispatch(createProduct(name, price, description, imageUrl, countInStock, category));
    }
  }, [imageUrl, dispatch, name, price, description, countInStock, category]);

  const submitHandler = async (e) =>
  {
    e.preventDefault()
    if (image) {
      await handleUpload()
    }

    if (imageUrl) {
      dispatch(createProduct(name, price, description, imageUrl, countInStock, category))
    }
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
            <h2 className="content-title">Add product</h2>
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
                    error && (<Message variant="alert-danger">{error}</Message>)
                  }
                  {
                    loading && <Loading />
                  }
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
                  {/* <div className="mb-4">
                    <label htmlFor="product_color" className="form-label">
                      Color
                    </label>
                    <ColorPicker onChange={(selectedColors) => setColor(selectedColors)} />
                  </div> */}
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Category
                    </label>
                    {/* <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value || null)}>
                      <option>All category</option>
                      <option value="">None</option>
                      {
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                      }
                    </select> */}
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value || null)}>
                      <option>All category</option>
                      <option value="">None</option>
                      {
                        parentCategories.map((parent) => (
                          <optgroup label={parent.name}>
                            {
                              categories
                                .filter((category) => category.parent === parent._id)
                                .map((child) => (
                                  <option key={child._id} value={child._id}>{child.name}</option>
                                ))
                            }
                          </optgroup>
                        ))
                      }
                    </select>
                  </div>
                  {/* <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Category
                    </label>
                    <TreeSelect
                      id="product_category"
                      treeData={categoryTree}
                      value={category}
                      onChange={(e) => setCategory(e.target.value || null)}
                    />
                  </div> */}
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
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    /> */}
                    <input className="form-control mt-3" type="file" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;