import React from 'react'
import CreateDiscount from './CreateDiscount'
import DiscountsTable from './DiscountsTable';

const MainDiscounts = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Discounts</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            
            <CreateDiscount />
            <DiscountsTable />
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}

export default MainDiscounts