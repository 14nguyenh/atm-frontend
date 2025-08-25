const API_BASE = "http://localhost:8080"

export async function registerCustomer(name, pin) {
  const response = await fetch(`${API_BASE}/customer/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, pin })
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return await response.json();
}

export async function login(name, pin) {
  const response = await fetch(`${API_BASE}/customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, pin })
  });
  if(!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export async function createAccount(token) {
  const res = await fetch(`${API_BASE}/account`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ initialBalance: 0 })
  });
  if (!res.ok) throw new Error("Failed to create account");
  return await res.json();
}

export async function getAccounts(token) {
  const res = await fetch(`${API_BASE}/account`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return await res.json();
}

export async function deposit(token, accountId, amount) {
  const res = await fetch(`${API_BASE}/transaction/deposit/${accountId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ amount })
  });
  if (!res.ok) throw new Error("Deposit failed");
  return await res.json();
}

export async function withdraw(token, accountId, amount) {
  const res = await fetch(`${API_BASE}/transaction/withdraw/${accountId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ amount })
  });
  if (!res.ok) throw new Error("Withdraw failed");
  return await res.json();
}

export async function getTransactions(token, accountId) {
  const res = await fetch(`${API_BASE}/transaction/${accountId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
}
