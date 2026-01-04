import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RoleSwitcher = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = (targetRole) => {
    if (auth.switchRole(targetRole)) {
      if (targetRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      alert(`No ${targetRole} session found. Please login as ${targetRole}.`);
    }
  };

  if (!auth.user) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      borderRadius: '5px',
      zIndex: 1000
    }}>
      <div>Current: {auth.user.role}</div>
      <button 
        onClick={() => handleRoleSwitch('user')}
        disabled={auth.user.role === 'user'}
        style={{ margin: '5px' }}
      >
        Switch to User
      </button>
      <button 
        onClick={() => handleRoleSwitch('admin')}
        disabled={auth.user.role === 'admin'}
        style={{ margin: '5px' }}
      >
        Switch to Admin
      </button>
    </div>
  );
};

export default RoleSwitcher;