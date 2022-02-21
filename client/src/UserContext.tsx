import React, { useEffect, useState } from 'react';

export interface User {
  id: string;
  username: string;
}

export const UserContext = React.createContext<{ user: User | null; setUser: (user: User) => void }>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/self')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
