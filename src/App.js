import Home from "./pages/Home/Home";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Reg from "./components/Reg/Reg";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart/Cart";
import Favorite from "./pages/Favorite/Favorite";
import EmptyCart from "./components/EmptyCart";
import EmptyFavorite from "./components/EmptyFavorite";
import MyProducts from "./components/MyProducts/MyProducts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/reg" element={<Reg />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/emptyCart' element={<EmptyCart />} />
        <Route path='/emptyFavorite' element={<EmptyFavorite />} />
        <Route path='/myProducts' element={<MyProducts/>} />
      </Routes>
    </div>
  );
}

export default App;
