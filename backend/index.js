const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

// Middleware do parsowania JSON
app.use(bodyParser.json());
app.use(cors());

// Połączenie z bazą danych
const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user_password",
  database: "school_shop",
});

db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err.stack);
    return;
  }
  console.log("Połączono z bazą danych!");
});

// Trasa rejestracji
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  console.log("Dane z formularza:", { username, password, email });

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Wszystkie pola są wymagane (username, password, email)",
    });
  }

  // Sprawdzanie, czy użytkownik o podanym username lub email już istnieje
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error("Błąd zapytania do bazy:", err);
        return res
          .status(500)
          .json({ message: "Błąd bazy danych", error: err });
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Użytkownik z takim loginem lub e-mailem już istnieje",
        });
      }

      // Haszowanie hasła
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Błąd przy haszowaniu hasła:", err);
          return res
            .status(500)
            .json({ message: "Błąd przy haszowaniu hasła", error: err });
        }

        // Dodanie użytkownika do bazy danych
        db.query(
          "INSERT INTO users (username, password, email, is_admin) VALUES (?, ?, ?, ?)",
          [username, hashedPassword, email, false], // Nowy użytkownik zawsze będzie miał is_admin = false
          (err, results) => {
            if (err) {
              console.error("Błąd podczas dodawania użytkownika:", err);
              return res.status(500).json({
                message: "Błąd podczas dodawania użytkownika",
                error: err,
              });
            }

            return res
              .status(201)
              .json({ message: "Rejestracja zakończona sukcesem" });
          }
        );
      });
    }
  );
});

// Trasa logowania
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Wszystkie pola są wymagane (username, password)",
    });
  }

  // Sprawdzanie, czy użytkownik istnieje
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Błąd zapytania do bazy:", err);
        return res
          .status(500)
          .json({ message: "Błąd bazy danych", error: err });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Nieprawidłowy login lub hasło" });
      }

      const user = results[0];

      // Sprawdzanie hasła
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Błąd przy porównywaniu haseł:", err);
          return res
            .status(500)
            .json({ message: "Błąd przy logowaniu", error: err });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Nieprawidłowy login lub hasło" });
        }

        // Sprawdzanie, czy użytkownik jest administratorem
        if (user.is_admin) {
          console.log("Zalogowany użytkownik to ADMIN!");
        } else {
          console.log("Zalogowany użytkownik to zwykły użytkownik.");
        }

        // Jeśli hasło się zgadza, zwracamy dane użytkownika (np. token, user id, etc.)
        return res.status(200).json({
          message: "Zalogowano pomyślnie",
          user: {
            id: user.id,
            username: user.username,
            is_admin: user.is_admin, // Wysyłamy informację o tym, czy użytkownik jest adminem
          },
        });
      });
    }
  );
});

// Trasa do aktualizacji produktu
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category, image_url } = req.body;

  if (!name || !description || !price || !quantity || !category || !image_url) {
    return res.status(400).json({
      message:
        "Wszystkie pola są wymagane (name, description, price, quantity, category, image_url)",
    });
  }

  console.log(req.body);

  // Zapytanie SQL do aktualizacji produktu
  const query = `
    UPDATE products
    SET name = ?, description = ?, price = ?, quantity = ?, category = ?, image_url = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [name, description, price, quantity, category, image_url, id],
    (err, results) => {
      if (err) {
        console.error("Błąd zapytania do bazy:", err);
        return res
          .status(500)
          .json({ message: "Błąd bazy danych", error: err });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Produkt nie znaleziony" });
      }

      res.status(200).json({ message: "Produkt zaktualizowany pomyślnie" });
    }
  );
});

// Trasa do dodawania nowego produktu
app.post("/products", (req, res) => {
  const { name, description, price, quantity, category, image_url } = req.body;

  // Walidacja danych wejściowych
  if (!name || !description || !price || !quantity || !category || !image_url) {
    return res.status(400).json({
      message:
        "Wszystkie pola są wymagane (name, description, price, quantity, category, image_url)",
    });
  }

  const query = `
    INSERT INTO products (name, description, price, quantity, category, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, description, price, quantity, category, image_url],
    (err, results) => {
      if (err) {
        console.error("Błąd zapytania do bazy:", err);
        return res
          .status(500)
          .json({ message: "Błąd bazy danych", error: err });
      }

      res.status(201).json({
        message: "Produkt dodany pomyślnie",
        product: {
          id: results.insertId,
          name,
          description,
          price,
          quantity,
          category,
          image_url,
        },
      });
    }
  );
});

app.get("/products", (req, res) => {
  const { category } = req.query;

  let query = "SELECT * FROM products";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Błąd zapytania do bazy:", err);
      return res.status(500).json({ message: "Błąd bazy danych", error: err });
    }
    res.json(results);
    console.log(results); // Zaloguj wyniki
  });
});

// // Endpoint do składania zamówień
// app.post("/api/orders", (req, res) => {
//   const { userId, totalPrice } = req.body;

//   // Sprawdzamy, czy wymagane pola zostały przekazane
//   if (!userId || !totalPrice) {
//     return res.status(400).json({
//       message: "Pole userId i totalPrice są wymagane",
//     });
//   }

//   // Dodanie zamówienia do tabeli `orders`
//   const query =
//     "INSERT INTO orders (id_user, total_price, order_date) VALUES (?, ?, NOW())";

//   db.query(query, [userId, totalPrice], (err, result) => {
//     if (err) {
//       console.error("Błąd przy dodawaniu zamówienia:", err);
//       return res.status(500).json({ message: "Błąd bazy danych" });
//     }

//     res.status(201).json({
//       message: "Zamówienie zostało złożone pomyślnie",
//       orderId: result.insertId, // ID nowo utworzonego zamówienia
//     });
//   });
// });

// Uruchomienie serwera
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
