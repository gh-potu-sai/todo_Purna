import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
    Logout
    </button>
  );
}

export default LogoutButton;
