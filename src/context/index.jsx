import { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext();
export const SearchStateContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(window?.localStorage?.cf_data || null) || {});
  const searchState = useState('');

  return (
    <SearchStateContext.Provider value={searchState}>
      <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={setUser}>{children}</UserUpdateContext.Provider>
      </UserContext.Provider>
    </SearchStateContext.Provider>
  );
};
