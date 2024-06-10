import React from 'react'
import ExpiryAlert from './ExpiryAlert';
import LowStockAlert from './LowStockAlert';

function AlertPage({medicines}) {
  return (
    <div className="alert flex">
    <div className="expiry w-1/2">
    <ExpiryAlert medicines={medicines} />
    </div>
    <div className="stock w-1/2">
    <LowStockAlert medicines={medicines} />
    </div>
   
</div>
  )
}

export default AlertPage
