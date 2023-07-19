import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableRow } from "./tableRow";
import { Navigate } from "react-router-dom";
import "../App.css";

const DisplayOrder = () => {
  const [orderTotals, setOrderTotals] = useState([]);
  const [direct, setdirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderTotals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        const data = response.data;
        setOrderTotals(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    // Refresh the page only once during initial load
    if (isLoading) {
      fetchOrderTotals();
    }
  }, []);

  function returnmenu(e) {
    e.preventDefault();
    setdirect(true);
  }

  if (direct) {
    // cant call inside function
    return <Navigate to={"/"} />;
  }

  if (isLoading) {
    return (
      <div id="loading-wrapper">
        <div id="loading-text">LOADING</div>
        <div id="loading-content"></div>
      </div>
    );
  }

  return (
    <div className="m-3">
      <div className="flex justify-between mt-8 ">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold   ">Order List Table:</h1>
        </div>
        <div className="ml-auto">
          <button
            className="bg-blue-600 rounded-full   text-white p-3"
            onClick={(e) => returnmenu(e)}
          >
            GO TO MENU
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2  bg-gray-700 text-white underline underline-offset-4 text-left text-md font-semibold  uppercase tracking-wider">
                      OrderId
                    </th>
                    <th className="px-5 py-3 border-b-2  bg-gray-700 text-left text-md underline underline-offset-4 font-semibold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2  bg-gray-700 text-left text-md underline underline-offset-4 font-semibold text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2  bg-gray-700 text-left text-md underline underline-offset-4 font-semibold text-white uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-5 py-3 border-b-2  bg-gray-700 text-left text-white underline underline-offset-4">
                      View Invoice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderTotals.map((ord) => (
                    <TableRow data={ord} key={ord.orderId} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOrder;
