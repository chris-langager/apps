import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const UserInfo: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>not logged in</div>;
  }

  return (
    <div>
      current user: {user.username} ({user.id})
    </div>
  );
};
