import React from "react";
import { Button, ListGroup, ListGroupItem, Alert } from "react-bootstrap";

const Cart = ({ onBack, productsCart, user }) => {
  const totalPrice = productsCart.reduce(
    (acc, product) =>
      acc + parseFloat(product.price) * parseInt(product.quantity),
    0
  );

  // Funkcja do wysyłania zamówienia do bazy danych
  //   const handleCheckout = async () => {
  //     // Jeśli koszyk jest pusty, nie wysyłaj zamówienia
  //     if (productsCart.length === 0) {
  //       alert("Twój koszyk jest pusty!");
  //       return;
  //     }

  //     // Tworzymy dane do wysłania
  //     const order = {
  //       userId: user.id, // ID użytkownika
  //       totalPrice: totalPrice.toFixed(2), // Łączna cena
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3000/api/orders", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(order),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Błąd przy składaniu zamówienia");
  //       }

  //       const data = await response.json();
  //       alert(`Zamówienie złożone pomyślnie! ID zamówienia: ${data.orderId}`);
  //     } catch (error) {
  //       console.error("Błąd:", error);
  //       alert("Wystąpił błąd przy składaniu zamówienia. Spróbuj ponownie.");
  //     }
  //   };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Twój koszyk</h2>
      {productsCart.length === 0 ? (
        <Alert variant="info">Twój koszyk jest pusty</Alert>
      ) : (
        <>
          <ListGroup>
            {productsCart.map((item) => (
              <ListGroupItem
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong> - {item.price} PLN
                </div>
                <div>Ilość: {item.quantity}</div>
              </ListGroupItem>
            ))}
          </ListGroup>
          <div className="mt-3 text-center">
            <h4>Łączna cena: {totalPrice.toFixed(2)} PLN</h4>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Button variant="secondary" onClick={onBack} className="mr-2">
          Powrót do sklepu
        </Button>
        <Button variant="primary">Zapłać</Button>
      </div>
    </div>
  );
};

export default Cart;
