import React from 'react'

export const InvoiceRow = ({item}) => {
  return (
    <tr>
    <td>{item.itemName}</td>
    <td>{item.quantity}</td>
    <td>{(item.unitPrice)}</td>
    <td>{(item.quantity * item.unitPrice).toFixed(3)}</td>
  </tr>
 
  
  )
}
