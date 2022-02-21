import React, { useEffect, useState } from 'react';

export interface User {
  id: string;
  username: string;
}

export const UserContext = React.createContext<{ user: User | undefined | null; setUser: (user: User | null) => void }>(
  {
    user: undefined, //undefined means we don't know about user info yet, null will be if they are for sure not logged in
    setUser: () => {},
  }
);

export const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/self')
      .then((res) => res.json())
      .then(({ user }) => setUser(user));
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
