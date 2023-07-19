import axios from "axios";
import "../App.css";
import DisplayOrder from "./DisplayOrder";
import { useState,useEffect } from "react";
import {Navigate} from "react-router-dom"

export const Uploadfile = () => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (display) {
      alert("Data uploaded successfully. You can see it by clicking on view orders.");
      setDisplay(false);
    }
  }, [display]);

  useEffect(()=>{
deletedb();
  },[])

  async function uploadFile(ev) {
    const files = ev.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    try {
      await axios.post("https://odd-blue-hermit-crab-sock.cyclic.app/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      setDisplay(true);
    } catch (error) {
      console.log("Error in axios: ", error);
    }
  }



  if (display) {
    return <Navigate to="/displayOrder" />;
  }

  function deletedb() {
    axios.post("https://odd-blue-hermit-crab-sock.cyclic.app/deletedb");
    // alert("previos data deleted successfully now you can upload new file")
  }

  return (
    <div>
      <div class="w-full h-full gap-4 mt-[8%] flex flex-col  items-center justify-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl text-blue-400 font-semibold">
            
"Effortlessly Manage Your Orders with Ease"
           {" "}
          </h1>
          <p className="text-md ">
          Easily upload CSV files containing order details including order ID, customer, date, product, quantity, and unit price. Our user-friendly dashboard empowers shopkeepers to access a comprehensive list of tables, providing a clear overview of all orders at a glance. .{" "}
          </p>
        </div>

        <div>
          <label
            for="file-upload"
            class="flex flex-col items-center h-[300px] w-96 justify-center px-4 py-6  border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>

            <span class="text-gray-600 mt-2">Upload a file in .csv format </span>
            <input
              id="file-upload"
              type="file"
              class="hidden"
              multiple
              onChange={(e)=>uploadFile(e)}
            />
          </label>
        </div>

        <div className="flex gap-3">
       
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white  rounded-full p-4 "
            onClick={deletedb}
          >
            Delete Before file to add new file
          </button>
        </div>
      </div>
    </div>
  );
};
