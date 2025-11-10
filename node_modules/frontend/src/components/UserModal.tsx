import React, { useState, useEffect } from 'react';

interface User {
  id?: number;
  nome: string;
  email: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  userToEdit: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, userToEdit }) => {
  const [user, setUser] = useState<User>({ nome: '', email: '' });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser({ nome: '', email: '' });
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{userToEdit ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" id="id" value={user.id || ''} />
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome</label>
            <input type="text" className="form-input" id="nome" value={user.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input type="email" className="form-input" id="email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;