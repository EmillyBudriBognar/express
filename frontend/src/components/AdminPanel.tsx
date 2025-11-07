import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import UserTable from './UserTable';
import UserModal from './UserModal';
import '../App.css';

interface User {
  id: number;
  nome: string;
  email: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const url = "http://localhost:3000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${url}/usuarios`);
    const data = await res.json();
    setUsers(data);
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
    await fetch(`${url}/usuarios/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleSaveUser = async (user: User) => {
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