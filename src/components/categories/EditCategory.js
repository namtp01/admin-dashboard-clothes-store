import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editCategory, listCategories, updateCategory } from "../../redux/actions/CategoryActions";
import { CATEGORY_UPDATE_RESET } from "../../redux/constants/CategoryConstants";
import Toast from "../LoadingError/Toast";
import { Link, useParams } from 'react-router-dom';
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const EditCategory = (props) =>
{
  const { categoryId } = useParams()

  const [name, setName] = useState('')
  const [parent, setParent] = useState(null)

  const dispatch = useDispatch()

  const categoryEdit = useSelector((state) => state.categoryEdit)
  const { loading, error, category } = categoryEdit

  const categoryList = useSelector(state => state.categoryList)
  const { categories } = categoryList

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate

  useEffect(() =>
  {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() =>
  {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      toast.success("Category Updated", ToastObjects)
    } else {
      if (!category.name || category._id !== categoryId) {
        console.log(category._id);
        dispatch(editCategory(categoryId))
      } else {
        setName(category.name)
        setParent(category.parent ? category.parent._id : null)
      }
    }
  }, [dispatch, categories, categoryId, category, successUpdate])

  const parentCategories = categories.filter((category) => !category.parent)

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(updateCategory(categoryId, name, parent));
  };

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="col-md-12 col-lg-4">
          <div className="content-header">
            <Link to="/categories" className="btn mt-3 btn-danger mb-3 text-white">
              Go to categories
            </Link>
            <h2 className="content-title">Edit category</h2>
          </div>

          <form onSubmit={submitHandler}>
            {
              errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>
            }
            {
              loadingUpdate && <Loading />
            }
            {/* {
              loading ? <Loading /> : error ? (<Message variant="alert-danger">{error}</Message>) : (
                <>
                  <div className="mb-4">
                    <label htmlFor="product_name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control py-3"
                      id="product_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <select className="form-select" value={parent} onChange={(e) => setParent(e.target.value || null)}>
                      <option>All category</option>
                      <option value="">None</option>
                      {
                        parentCategories.map((category) => (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </>
              )
            } */}
            <div className="mb-4">
                    <label htmlFor="product_name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control py-3"
                      id="product_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <select className="form-select" value={parent} onChange={(e) => setParent(e.target.value || null)}>
                      <option>All category</option>
                      <option value="">None</option>
                      {
                        parentCategories.map((category) => (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                      }
                    </select>
                  </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary py-3">Edit Category</button>
            </div>

          </form>
        </div>
      </section>
    </>
  );
};

export default EditCategory;