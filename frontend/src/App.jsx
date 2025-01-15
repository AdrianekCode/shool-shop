import "./App.css";

import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import HomePage from "./components/HomePage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isCorrectLogin, setIsCorrectLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  const createAccount = () => {
    setIsLogin(false);
  };

  const handleLoginSuccess = (isAdmin) => {
    setIsCorrectLogin(true);
    setIsAdmin(isAdmin);
  };

  return isCorrectLogin ? (
    <>
      <HomePage isAdmin={isAdmin} user={user} />
    </>
  ) : isLogin ? (
    <>
      <h1 className="text-center">Witaj w sklepiku szkolnym!</h1>
      <Login
        createAccount={createAccount}
        setIsCorrectLogin={setIsCorrectLogin}
        handleLoginSuccess={handleLoginSuccess}
        setUser={setUser}
      />
    </>
  ) : (
    <>
      <h1 className="text-center">Witaj w sklepiku szkolnym!</h1>
      <Register setIsLogin={setIsLogin} />
    </>
  );
}

export default App;
