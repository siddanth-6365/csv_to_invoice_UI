import React, { useState } from "react";
import "../App.css";
import {Navigate} from "react-router-dom"

export const TableRow = ({ data }) => {
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState();

  const openInvoice = (id) => {
    setRedirect(true);
    setUserId(id);
  };

  if (redirect) {
    let path = `/invoiceView/${userId}`;
    return <Navigate to={path} />;
  }

  return (
    <>
      <tr>
        <td className="px-5 py-5 bg-gray-700 text-sm">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10"></div>
            <div className="ml-3">
              <p className="text-gray-100 whitespace-no-wrap">{data.orderId}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 bg-gray-700 text-gray-100  text-sm">
          <p className="text-gray-100 whitespace-no-wrap">{data.customerName}</p>
        </td>
        <td className="px-5 py-5 bg-gray-700 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-gray-200 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 text-gray-200 opacity-50 rounded-full"
            ></span>
            <span className="relative"> {data.orderDate}</span>
          </span>
        </td>
        <td className="px-5 py-5 bg-gray-700 text-sm">
          <p className="text-gray-100 whitespace-no-wrap">
            {Math.round(data.totalAmount)} INR
          </p>
        </td>
        <td className="px-5 py-5 bg-gray-700 text-sm text-right">
          <button className="text-white underline text-lg" onClick={() => openInvoice(data.orderId)}>show</button>
        </td>
      </tr>
    </>
  );
};
