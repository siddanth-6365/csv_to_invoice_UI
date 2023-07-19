import { Uploadfile } from "./Components/Uploadfile";
import DisplayOrder from "./Components/DisplayOrder";
import { InvoicePage } from "./Components/InvoicePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Uploadfile />} />
          <Route path="/displayOrder" element={<DisplayOrder />} />
          <Route  path="/invoiceView/:id"  element={<InvoicePage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
