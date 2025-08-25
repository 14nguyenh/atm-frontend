import React, { useEffect, useState } from "react";
import { getAccounts, createAccount, deposit, withdraw, getTransactions } from "./api";

export default function AccountsPage({ token }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const accs = await getAccounts(token);
        setAccounts(accs);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [token]);

  const handleCreateAccount = async () => {
    try {
      const newAcc = await createAccount(token);
      setAccounts([...accounts, newAcc]);
    } catch (err) {
      alert("Error creating account");
    }
  };

  const handleSelectAccount = async (accountId) => {
    setSelectedAccount(accountId);
    try {
      const txs = await getTransactions(token, accountId);
      setTransactions(txs);
    } catch (err) {
      alert("Failed to load transactions");
    }
  };

  const handleDeposit = async () => {
    if (!selectedAccount || !amount) return;
    try {
      await deposit(token, selectedAccount, parseFloat(amount));
      setAmount("");
      await refreshAccounts();
      handleSelectAccount(selectedAccount);
    } catch (err) {
      alert("Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    if (!selectedAccount || !amount) return;
    try {
      await withdraw(token, selectedAccount, parseFloat(amount));
      setAmount("");
      await refreshAccounts();
      handleSelectAccount(selectedAccount);
    } catch (err) {
      alert("Withdraw failed");
    }
  };

  const refreshAccounts = async () => {
    try {
      const accs = await getAccounts(token);
      setAccounts(accs);
    } catch (err) {
      console.error("Failed to refresh accounts", err);
    }
  }

  return (
    <div>
      <h2>Accounts</h2>
      <button onClick={handleCreateAccount}>Create New Account</button>
      
      <ul>
        {accounts.map(acc => (
          <li key={acc.accountId}>
            Account #{acc.accountId} - Balance: ${acc.balance}
            <button onClick={() => handleSelectAccount(acc.accountId)}>View Transactions</button>
          </li>
        ))}
      </ul>

      {selectedAccount && (
        <div>
          <h3>Transactions for Account #{selectedAccount}</h3>
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
          <ul>
            {transactions.map(tx => (
              <li key={tx.id}>
                {tx.type} - ${tx.amount} - {tx.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

