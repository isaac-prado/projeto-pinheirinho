import React, { useState, useEffect } from 'react';
import { Switch } from '@material-ui/core';
import { Table } from '../components/table';
import { customerMock } from '../services/customerService';
import ActionModal from '../components/actionModal';
import './App.css';
import { AttachMoney, ShoppingCart } from '@material-ui/icons';

interface RowData {
  name: string;
  isActive: boolean;
  credit: number;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState(customerMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', action: '' });
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (rowData: RowData, action: string) => {
    setSelectedRow(rowData);
    setModalConfig({
      title: action === 'updateCredit' ? 'Adicionar crédito' : 'Adicionar pedido',
      action,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (value: number) => {
    if (selectedRow) {
      const updatedData = data.map((row) => {
        if (row.name === selectedRow.name) {
          return modalConfig.action === 'updateCredit'
            ? { ...row, credit: row.credit + value }
            : { ...row, credit: row.credit - value };
        }
        return row;
      });
      setData(updatedData);
      setIsModalOpen(false);
    }
  };

  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'Crédito', field: 'credit' },
    {
      title: 'Ativo',
      field: 'isActive',
      render: (rowData: RowData) => (
        <Switch checked={rowData.isActive} color="primary" disabled />
      ),
    },
    {
      title: 'Ações',
      field: 'actions',
      render: (rowData: RowData) => (
        <div className="action-icons">
          <AttachMoney className="action-icon" onClick={() => handleOpenModal(rowData, 'updateCredit')} />
          <ShoppingCart className="action-icon" onClick={() => handleOpenModal(rowData, 'addOrder')} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">
          {formatDate(currentTime)}
        </div>
      </div>
      <Table title="Gestão de assinaturas" columns={columns} data={data} />
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        onSubmit={handleSubmit}
      />
      <footer className="footer">
        &copy; 2024 Pinheirinho Restaurant
      </footer>
    </>
  );
};

export default App;
