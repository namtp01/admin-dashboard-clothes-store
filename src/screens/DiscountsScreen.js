import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import MainDiscounts from './../components/discounts/MainDiscounts';

const DiscountsScreen = () => {
  return (
    <>
        <Sidebar />
        <main className="main-wrap">
            <Header />
            <MainDiscounts />
        </main>
    </>
  )
}

export default DiscountsScreen