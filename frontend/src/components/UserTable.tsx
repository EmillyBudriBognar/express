import React from 'react';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn btn-small btn-edit" onClick={() => onEdit(user)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button className="btn btn-small btn-delete" onClick={() => onDelete(user.id)}>
                    <i className="fas fa-trash"></i> Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;