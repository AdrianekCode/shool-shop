import React, { useState } from "react";
import axios from "axios";

const Login = ({ createAccount, handleLoginSuccess, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    try {
      // Wysyłanie danych logowania do backendu
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      console.log("Response: ", response.data);
      setUser(response.data);

      if (response.data.user.is_admin) {
        handleLoginSuccess(true); // Użytkownik jest administratorem
      } else {
        handleLoginSuccess(false); // Użytkownik jest zwykłym użytkownikiem
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert("Nieprawidłowa nazwa użytkownika lub hasło");
        } else {
          alert("Wystąpił błąd serwera. Spróbuj ponownie później.");
        }
      } else {
        alert(
          "Wystąpił problem z połączeniem. Sprawdź swoje połączenie sieciowe."
        );
      }
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
            onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
          />
        </div>
        <div className="buttons">
          <button className="btn btn-success text-center" onClick={handleLogIn}>
            Zaloguj się
          </button>
          <p className="text-center">Nie masz konta?</p>
          <button
            className="btn btn-primary text-center"
            onClick={createAccount}
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

//casual_user - 123
//admin - admin123
