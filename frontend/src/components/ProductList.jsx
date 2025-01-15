import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const ProductList = ({ category, isAdmin, setProductsCart }) => {
  const [products, setProducts] = useState([]);
  const [addingView, setAddingView] = useState(false);

  const fetchProducts = (category = "") => {
    let url = "http://localhost:3000/products";

    if (category) {
      url += `?category=${category}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) =>
        console.error("Błąd podczas ładowania produktów:", error)
      );
  };

  const updateProductsList = () => {
    fetchProducts(category);
  };

  useEffect(() => {
    fetchProducts(category); // Domyślnie pobierz wszystkie produkty
  }, [category, addingView]);

  return (
    <div className="productList">
      {isAdmin && (
        <div className="productCard add-card">
          {addingView ? (
            <ProductForm
              obj={{}}
              setAddingView={setAddingView}
              addingView={addingView}
              fetchProducts={fetchProducts}
              category={category}
            />
          ) : (
            <div className="add-button" onClick={() => setAddingView(true)}>
              +
            </div>
          )}
        </div>
      )}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          obj={product}
          isAdmin={isAdmin}
          fetchProducts={fetchProducts}
          category={category}
          setProductsCart={setProductsCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
