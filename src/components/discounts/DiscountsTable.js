import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDiscount, listDiscounts, } from '../../redux/actions/DiscountActions'
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import { Link } from 'react-router-dom'

const DiscountsTable = () =>
{
  const dispatch = useDispatch()
  const discountList = useSelector((state) => state.discountList)
  const { loading, error, discounts = [] } = discountList || {}

  useEffect(() =>
  {
    dispatch(listDiscounts())
  }, [dispatch])

  const deleteHandler = (id) =>
  {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteDiscount(id))
    }
  }
  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            {/* <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th> */}
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {
            loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
              discounts.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount._id}</td>
                  <td>{discount.name}</td>
                  <td>{discount.code}</td>
                  <td className="text-end">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Link to={`/discounts/${discount._id}/edit`} className="btn btn-primary">
                        Edit
                      </Link>
                      <button onClick={() => deleteHandler(discount._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default DiscountsTable