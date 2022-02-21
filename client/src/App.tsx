import { useEffect, useState } from 'react';
import { User, UserContext, UserProvider } from './UserContext';

import { UserInfo } from './UserInfo';

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then(({ message }) => setMessage(message));
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <UserInfo />

        {message}
      </UserProvider>
    </div>
  );
}
