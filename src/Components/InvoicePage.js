import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { InvoiceRow } from "./invoiceRow";

export const InvoicePage = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // console.log("params :",searchParams)
  // const id = searchParams.get('id');

  const currentUrl = window.location.href;
  console.log(currentUrl);
  const id = currentUrl.split("/")?.[4];

  const [itemsdata, setItems] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [direct, setdirect] = useState(false);

  useEffect(() => {
    const fetchOrderTotals = async () => {
      try {
        const path = `https://csvtoinvoiceapi-production.up.railway.app/invoice/${id}`;
        console.log("paht :", path);
        const response = await fetch(path);
        const data = await response.json();
        console.log("response data:", data);
        setItems(data.items);
        setuserdata(data.userData[0]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrderTotals();
    // setDatefun();
  }, [id]); // Include 'id' as a dependency to re-fetch data when 'id' changes

  function returnmenu(e) {
    e.preventDefault();
    setdirect(true);
  }

  if (direct) {
    // cant call inside function
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div  className="flex justify-center mt-8 ">
        <div className="ml-auto">
          <button
            className="bg-blue-600 rounded-full   text-white p-3"
            onClick={(e) => returnmenu(e)}
          >
            GO TO MENU
          </button>
        </div>
      </div>

      <table className="">
        <tr>
          <th colspan="3">Invoice #{id}</th>
          <th>{userdata.orderDate}</th>
        </tr>
        <tr>
          <td colspan="2">
            <strong>Pay To:</strong> <br /> XYZ <br />
            India, HYD - 503224
          </td>
          <td colspan="2">
            <strong>Customer:</strong> <br />
            {userdata.customerName} <br />
            Noida sector-62 <br />
            Inida, 201309
          </td>
        </tr>

        <tr className="">
          <th className="px-5 py-3 border-b-2   text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            item
          </th>
          <th className="px-5 py-3 border-b-2   text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-5 py-3 border-b-2  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Unit price
          </th>
          <th className="px-5 py-3 border-b-2   text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Total Amount
          </th>
        </tr>

        <tbody>
          {itemsdata.map((ite) => (
            <InvoiceRow item={ite} />
          ))}
        </tbody>
        <tr>
          <th colspan="3">subtotal:</th>
          <td>{Math.round(userdata.totalAmount)}</td>
        </tr>
      </table>
    </>
  );
};
