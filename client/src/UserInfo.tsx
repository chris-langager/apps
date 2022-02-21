import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

export const UserInfo: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const [newUsername, setNewUsername] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    })
      .then((res) => res.json())
      .then(({ user }) => setUser(user));
  };

  const logout = () => {
    fetch('/api/logout').then(() => setUser(null));
  };

  if (!user) {
    return (
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  return (
    <div>
      current user: {user.username} ({user.id}) <button onClick={logout}>log out</button>
    </div>
  );
};
