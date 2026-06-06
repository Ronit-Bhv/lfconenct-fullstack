import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  name: 'Ronit Bhujel',
  initials: 'R',
  email: 'ronit@meetingbasum.com',
  theme: 'light',
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);

  function updateUser(updates) {
    setUser((prev) => ({ ...prev, ...updates }));
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
