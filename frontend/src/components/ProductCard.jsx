import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { use } from "react";

const ProductCard = ({
  obj,
  isAdmin,
  fetchProducts,
  category,
  setProductsCart,
}) => {
  const [editingView, setEditingView] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (obj) => {
    setProductsCart((prevProducts) => [...prevProducts, { ...obj, quantity }]);
  };

  return (
    <div className="productCard">
      {editingView ? (
        <ProductForm
          obj={obj}
          setEditingView={setEditingView}
          editingView={editingView}
          fetchProducts={fetchProducts}
          category={category}
        />
      ) : (
        <div>
          <div className="img_container">
            <img src={`/product_images/${obj.image_url}`} alt={obj.name} />
          </div>
          <div className="text_container">
            <p className="title">{obj.name}</p>
            <div className="description_container">
              <p className="description">{obj.description}</p>
            </div>

            <p className="price">Cena: {obj.price}</p>
            <div className="amount">
              <label htmlFor="">Ilość: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="buttons_container text-center">
        {isAdmin ? (
          !editingView && (
            <button className="edit_btn" onClick={() => setEditingView(true)}>
              Edytuj
            </button>
          )
        ) : (
          <button className="edit_btn" onClick={() => addToCart(obj)}>
            Dodaj do koszyka
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
