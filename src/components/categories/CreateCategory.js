import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory, listCategories } from "../../redux/actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../redux/constants/CategoryConstants";
import Toast from "../LoadingError/Toast";  

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const CreateCategory = () =>
{
  const [name, setName] = useState('')
  const [parent, setParent] = useState(null)

  const dispatch = useDispatch()

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading, error, category } = categoryCreate

  const categoryList = useSelector(state => state.categoryList)
  const { categories = [] } = categoryList || {}

  useEffect(() =>
  {
    dispatch(listCategories())
  }, [dispatch])

  const parentCategories = categories.filter((category) => !category.parent)

  useEffect(() =>
  {
    if (category) {
      toast.success("Category Added", ToastObjects)
      dispatch({ type: CATEGORY_CREATE_RESET })
      setName('')
      setParent('')
    }
  }, [category, dispatch])

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(createCategory(name, parent));
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
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
          {/* <div className="mb-4">
            <label className="form-label">Images</label>
            <input className="form-control" type="file" />
          </div> */}
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
          {/* <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              rows="4"
            ></textarea>
          </div> */}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">Create category</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;

