import React from 'react';

const UserInfo = ({ userData }) => (
  <div>
    {userData.lastname ? (
      <h2>Hi, {userData.lastname} Welcome back</h2>
    ) : (
        <h2>Hi, {userData.user.email} Welcome back</h2>
    )}

  </div>
);

export default UserInfo; 