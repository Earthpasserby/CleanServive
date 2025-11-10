import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Layout from "../Layout";
import Home from "./Home";
import About from "./About";
import Pricing from "./Pricing";
function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <ScrollToTop>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
              {/* <Route path="/service" element={<Service />} /> */}
            </Route>
            {/* Add other routes here */}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
