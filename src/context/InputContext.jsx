// InputContext.js
import { createContext, useState } from 'react';

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [inputFromRecent, setInputFromRecent] = useState('');

  const triggerRecentInput = (input) => {
    setInputFromRecent(input);
  };

  return (
    <InputContext.Provider value={{ inputFromRecent, triggerRecentInput }}>
      {children}
    </InputContext.Provider>
  );
};
