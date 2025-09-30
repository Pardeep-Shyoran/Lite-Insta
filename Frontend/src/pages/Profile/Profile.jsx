import React from "react";
import { useSelector } from 'react-redux';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return <div>
    <h1>Profile Page</h1>
    <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    
  </div>;
};

export default Profile;
