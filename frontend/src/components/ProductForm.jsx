import React, { useState, useEffect } from "react";

const ProductForm = ({
  obj,
  setEditingView,
  editingView,
  setAddingView,
  addingView,
  fetchProducts,
}) => {
  const [name, setName] = useState(obj.name || "");
  const [description, setDescription] = useState(obj.description || "");
  const [price, setPrice] = useState(obj.price || "");
  const [imageUrl, setImageUrl] = useState(obj.image_url || "");
  const [quantity, setQuantity] = useState(obj.quantity || "");
  const [category, setCategory] = useState(obj.category || "food");

  // Funkcja zapisująca produkt
  const handleSave = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !imageUrl ||
      !quantity ||
      !category
    ) {
      alert("Wszystkie pola są wymagane!");
      return;
    }

    const newProduct = {
      name,
      description,
      price,
      image_url: imageUrl,
      quantity,
      category,
    };

    try {
      const url = obj.id
        ? `http://localhost:3000/products/${obj.id}`
        : "http://localhost:3000/products";

      const method = obj.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zapisać produktu");
      }

      console.log("dodano do bazy", newProduct);

      changeView();
      fetchProducts("");
    } catch (error) {
      console.error("Błąd zapisywania produktu:", error);
      alert("Wystąpił błąd podczas zapisywania produktu. Spróbuj ponownie.");
    }
  };

  // Funkcja zmieniająca widok
  const changeView = () => {
    editingView && setEditingView(false);
    addingView && setAddingView(false);
  };

  return (
    <div className="editFormContainer">
      <h3 className="text-center">
        {obj.id ? "Edytuj Produkt" : "Dodaj Produkt"}
      </h3>
      <div className="inputs_container">
        <div className="row_container">
          <label htmlFor="title">Nazwa:</label>
          <input
            className="field"
            id="title"
            type="text"
            placeholder="Nazwa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row_container">
          <label htmlFor="description">Opis: </label>
          <textarea
            id="description"
            className="field"
            placeholder="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row_container">
          <label htmlFor="price">Cena: </label>
          <input
            id="price"
            className="field"
            type="number"
            placeholder="Cena"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="row_container">
          <label htmlFor="img_url">URL</label>
          <input
            id="image_url"
            className="field"
            type="text"
            placeholder="URL Obrazu"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="row_container">
          <label htmlFor="quantity">Ilość: </label>
          <input
            id="quantity"
            className="field"
            type="number"
            placeholder="Ilość"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="row_container">
          <label htmlFor="category">Kategoria: </label>
          <select
            id="category"
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Jedzenie</option>
            <option value="drink">Picie</option>
            <option value="accessory">Akcesoria</option>
          </select>
        </div>
      </div>

      <div className="buttons_container">
        <button
          className="back_btn"
          onClick={() => {
            changeView();
          }}
        >
          Anuluj
        </button>
        <button onClick={handleSave} className="save_btn">
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
