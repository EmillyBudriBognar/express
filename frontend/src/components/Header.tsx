import React from 'react';

interface HeaderProps {
  onAddUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser }) => {
  return (
    <div className="header">
      <h1 className="page-title">Gerenciar Usuários</h1>
      <div className="user-actions">
        <button className="btn btn-primary" onClick={onAddUser}>
          <i className="fas fa-plus"></i> Adicionar Usuário
        </button>
      </div>
    </div>
  );
};

export default Header;