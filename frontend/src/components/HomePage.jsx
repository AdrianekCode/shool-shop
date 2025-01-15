import "../App.css";
import Navbar from "./Navbar";
import bag from "../assets/bag.svg";
import log_icon from "../assets/person-circle.svg";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const HomePage = ({ isAdmin, user }) => {
  const [category, setCategory] = useState("");
  const [productsCart, setProductsCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log(category);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleBackToShop = () => {
    setShowCart(false);
  };

  return (
    <>
      <header>
        Sklepik szkolny
        <img src={log_icon} alt="log-icon" />
        <img src={bag} alt="shop-bag" onClick={handleCartClick} />
      </header>
      {showCart ? (
        <Cart
          onBack={handleBackToShop}
          productsCart={productsCart}
          user={user}
        />
      ) : (
        <>
          <Navbar onCategoryChange={handleCategoryChange} />
          <ProductList
            category={category}
            isAdmin={isAdmin}
            setProductsCart={setProductsCart}
          />
          <footer>Adrian Szmandra 4AP</footer>
        </>
      )}
    </>
  );
};

export default HomePage;
