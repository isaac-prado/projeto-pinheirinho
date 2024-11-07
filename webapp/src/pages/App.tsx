import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import { customerMock } from '../services/customerService';
import './App.css';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">
          {formatDate(currentTime)}
        </div>
      </div>
      <Table title="Gestão de assinaturas" columns={columns} data={customerMock} />
      <footer className="footer">
        &copy; 2024 Pinheirinho Restaurant
      </footer>
    </>
  );
};

export default App;
