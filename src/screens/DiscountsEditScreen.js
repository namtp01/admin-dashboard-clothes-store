import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import EditDiscount from './../components/discounts/EditDiscount';

const DiscountsEditScreen = () => {
  const discountId = useParams()

  return (
    <>
      <Sidebar />
      <main className='main-wrap'>
        <Header />
        <EditDiscount discountId={discountId} />
      </main>
    </>
  )
}

export default DiscountsEditScreen