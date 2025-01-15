import React, { useState } from "react";
import axios from "axios";

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateUser = async () => {
    try {
      // Wysyłanie danych na backend
      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
        email,
      });

      // Jeśli odpowiedź z serwera jest ok, ustawiamy ekran logowania
      console.log("Rejestracja udana: ", response.data);
      setIsLogin(true); // Ustawienie, aby przejść do ekranu logowania
    } catch (err) {
      // Obsługa błędów
      if (err.response) {
        // Jeśli błąd pochodzi z serwera
        setErrorMessage(err.response.data.message);
      } else {
        // Jeśli błąd dotyczy np. braku połączenia
        setErrorMessage("Wystąpił błąd przy rejestracji. Spróbuj ponownie.");
      }
      console.error("Błąd rejestracji: ", err);
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  return (
    <>
      <div className="container w-25 position-absolute top-50 start-50 translate-middle bg-light p-5 form_div">
        <div className="mb-3">
          <label htmlFor="login_form" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            id="login_form"
            placeholder="Login"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email_form" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email_form"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password_form" className="form-label">
            Hasło
          </label>
          <input
            type="password"
            className="form-control"
            id="password_form"
            placeholder="Hasło"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="buttons">
          <button
            className="btn btn-success text-center"
            onClick={handleCreateUser}
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
