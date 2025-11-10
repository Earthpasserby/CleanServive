import { Outlet } from "react-router-dom";
import Navbar from "./src/Components/Navbar";
import Footer from "./src/Components/Footer";
import QuoteModal from "./src/Components/QuoteModal";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <QuoteModal />
    </>
  );
}
export default Layout;
