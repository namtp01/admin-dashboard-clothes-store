import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { DISCOUNT_UPDATE_RESET } from '../../redux/constants/DiscountConstants'
import { toast } from 'react-toastify'
import { editDiscount, updateDiscount } from '../../redux/actions/DiscountActions'
import Toast from '../LoadingError/Toast'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const EditDiscount = () =>
{

  const { discountId } = useParams()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [value, setValue] = useState('')
  const [maxValue, setMaxValue] = useState('')
  const [code, setCode] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [maxUses, setMaxUses] = useState('')
  // const [usesCount, setUsesCount] = useState('')
  // const [usersUsed, setUsersUsed] = useState('')
  const [maxUsesPerUser, setMaxUsesPerUser] = useState('')
  const [minOrderValue, setMinOrderValue] = useState('')
  const [isActive, setIsActive] = useState('')

  const dispatch = useDispatch()

  const discountEdit = useSelector((state) => state.discountEdit)
  const { loading, error, discount } = discountEdit

  const discountUpdate = useSelector((state) => state.discountUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = discountUpdate

  useEffect(() =>
  {
    if (successUpdate) {
      dispatch({ type: DISCOUNT_UPDATE_RESET })
      toast.success("Discount Updated", ToastObjects)
    } else {
      if (!discount.code || discount._id !== discountId) {
        dispatch(editDiscount(discountId))
      } else {
        setName(discount.name)
        setDescription(discount.description)
        setType(discount.type)
        setValue(discount.value)
        setMaxValue(discount.maxValue)
        setCode(discount.code)
        setStartDate(discount.startDate)
        setEndDate(discount.endDate)
        setMaxUses(discount.maxUses)
        // setUsesCount(discount.usesCount)
        // setUsersUsed(discount.usersUsed)
        setMaxUsesPerUser(discount.maxUsesPerUser)
        setMinOrderValue(discount.minOrderValue)
        setIsActive(discount.isActive)
      }
    }
  }, [dispatch, discount, discountId, successUpdate])

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(updateDiscount(discountId, name, description, type, value, maxValue, code, startDate, endDate, maxUses, maxUsesPerUser, minOrderValue, isActive));
  }
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="col-md-12 col-lg-4">
          <div className="content-header">
            <Link to="/categories" className="btn mt-3 btn-danger mb-3 text-white">
              Go to discounts
            </Link>
            <h2 className="content-title">Edit discount</h2>
          </div>

          <form onSubmit={submitHandler}>
            {
              errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>
            }
            {
              loadingUpdate && <Loading />
            }

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
              <label htmlFor="product_name" className="form-label">
                Description
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Type
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Value
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Max Value
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Code
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Start Date
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                End Date
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Max Uses
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Max Uses Per User
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={maxUsesPerUser}
                onChange={(e) => setMaxUsesPerUser(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Min Order Value
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                Is Active
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-3"
                id="product_name"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary py-3">Edit Category</button>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default EditDiscount