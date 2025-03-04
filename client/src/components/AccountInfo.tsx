// AccountInfo.js
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const AccountInfo = () => {
  const { user } = useContext(UserContext);

  // Optionally, you can redirect or show a message if the user is not logged in
  if (!user) return <div>Please log in to view account details.</div>;

  return (
    <div>
      <h1>Account Info</h1>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default AccountInfo;
