import React, { useState } from "react";
import { registerCustomer, login } from "./api";
import AccountsPage from "./AccountsPage";

export default function App() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [token, setToken] = useState(null);

  const handleRegister = async () => {
    try {
      const result = await registerCustomer(name, pin);
      alert("Registered successfully! Now log in.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const result = await login(name, pin);
      setToken(result.token);
    } catch (err) {
      alert("Login failed");
    }
  };

  if (!token) {
    return (
      <div>
        <h2>Login or Register</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="PIN" type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    );
  }

  return <AccountsPage token={token} />;

}

