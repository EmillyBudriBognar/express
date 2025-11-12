import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import UserTable from './UserTable';
import UserModal from './UserModal';
import '../App.css';

interface User {
  id?: number;
  nome: string;
  email: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, [url]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/usuarios`);
      if (!res.ok) {
        throw new Error(`Erro ao buscar usuários: ${res.statusText}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Falha ao buscar usuários:", error);
    }
  };

  const handleAddUser = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`${url}/usuarios/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error("Falha ao deletar usuário:", error);
    }
  };

  const handleSaveUser = async (user: User) => {
    try {
      if (user.id) {
        await fetch(`${url}/usuarios`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        await fetch(`${url}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }
      
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Falha ao salvar usuário:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header onAddUser={handleAddUser} />
        <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default AdminPanel;