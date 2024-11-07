import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import { customerMock } from '../services/customerService';
import './App.css';
import Modal from '../components/modal';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'Crédito', field: 'credit' },
  ];

  const handleAddUser = (data: { cpf: string; name: string; address: string; phone: string }) => {
    customerMock.push({ cpf: data.cpf, name: data.name, credit: 0, isActive: true });
    setUserModalOpen(false);
  };

  const handleRemoveUser = (data: { cpf: string }) => {
    const index = customerMock.findIndex((customer) => customer.cpf === data.cpf);
    if (index !== -1) {
      customerMock.splice(index, 1);
    }
    setRemoveModalOpen(false);
  };

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">{formatDate(currentTime)}</div>
      </div>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => setUserModalOpen(true)}>
          Adicionar Cliente
        </button>
        <button className="modal-button" onClick={() => setRemoveModalOpen(true)}>
          Remover Cliente
        </button>
      </div>
      <Table title="Gestão de assinaturas" columns={columns} data={customerMock} />
      <footer className="footer">&copy; 2024 Pinheirinho Restaurant</footer>

      {/* Modal para Adicionar Cliente */}
      <Modal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        title="Adicionar Cliente"
        onSubmit={handleAddUser}
        variant="register"
      />

      {/* Modal para Remover Cliente */}
      <Modal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        title="Remover Cliente"
        onSubmit={handleRemoveUser}
        variant="remove"
      />
    </>
  );
};

export default App;
