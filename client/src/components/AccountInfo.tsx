// AccountInfo.js
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

export function AccountInfo() {
  const { user } = useContext(UserContext);

  if (!user) return <div>Please log in to view account details.</div>;

  return (
    <div>
      <h1>Account Info</h1>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default AccountInfo;
