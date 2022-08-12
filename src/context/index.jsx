import { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext();
export const SearchStateContext = createContext();

export const UserContextProvider = ({ children }) => {
  let localStorageData = typeof window?.localStorage?.cf_data === 'object' ? window?.localStorage?.cf_data : null;
  const [user, setUser] = useState(JSON.parse(localStorageData));
  const searchState = useState('');

  return (
    <SearchStateContext.Provider value={searchState}>
      <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={setUser}>{children}</UserUpdateContext.Provider>
      </UserContext.Provider>
    </SearchStateContext.Provider>
  );
};
