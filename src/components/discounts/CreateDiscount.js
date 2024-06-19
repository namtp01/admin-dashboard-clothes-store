import React, { useEffect, useState } from 'react'
import Toast from "../LoadingError/Toast";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DISCOUNT_CREATE_RESET } from './../../redux/constants/DiscountConstants';
import { createDiscount } from './../../redux/actions/DiscountActions';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
}

const CreateDiscount = () =>
{
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

    const discountCreate = useSelector((state) => state.discountCreate)
    const { loading, error, discount } = discountCreate

    useEffect(() => {
        if (discount) {
            toast.success("Discount Added", ToastObjects)
            dispatch({ type: DISCOUNT_CREATE_RESET })
            setName('')
            setDescription('')
            setType('')
            setValue('')
            setMaxValue('')
            setCode('')
            setStartDate('')
            setEndDate('')
            setMaxUses('')
            // setUsesCount('')
            // setUsersUsed('')
            setMaxUsesPerUser('')
            setMinOrderValue('')
            setIsActive('')
        }
    }, [discount, dispatch])
    const submitHandler = (e) =>
    {
        e.preventDefault();
        dispatch(createDiscount(name, description, type, value, maxValue, code, startDate, endDate, maxUses, maxUsesPerUser, minOrderValue, isActive))
    }
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
                    {/* <div className="mb-4">
                        <label htmlFor="product_name" className="form-label">
                            Uses Count
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="form-control py-3"
                            id="product_name"
                            value={usesCount}
                            onChange={(e) => setUsesCount(e.target.value)}
                        />
                    </div> */}
                    {/* <div className="mb-4">
                        <label htmlFor="product_name" className="form-label">
                            Users Used
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="form-control py-3"
                            id="product_name"
                            value={usersUsed}
                            onChange={(e) => setUsersUsed(e.target.value)}
                        />
                    </div> */}
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
                        <button type="submit" className="btn btn-primary py-3">Create category</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateDiscount