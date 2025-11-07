import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <i className="fas fa-bolt"></i>
        </div>
        <div className="logo-text">DEV.WEB</div>
      </div>
      <div className="nav-item active">
        <div className="nav-icon"><i className="fas fa-users"></i></div>
        <div>Usuários</div>
      </div>
    </div>
  );
};

export default Sidebar;