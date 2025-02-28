import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Sankranthi from "./Sankranthi";
import Home from "./Home";
import Birthday from "./Birthday";
import Cricket from "./Cricket";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index path="Sankranthi" element={<Sankranthi />} />
          <Route path="birthday" element={<Birthday />} />
          <Route path="cricket" element={<Cricket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
