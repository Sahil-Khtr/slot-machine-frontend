import React, { createContext, useState, useContext } from "react";

// Create a context for user-related data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);

  // Function to update balance
  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <UserContext.Provider value={{ balance, updateBalance }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
