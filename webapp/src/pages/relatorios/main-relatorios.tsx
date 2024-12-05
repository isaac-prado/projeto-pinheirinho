import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { formatDateToFull } from '../../utils/dateFormatter';

const MainRelatorios: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">{formatDateToFull(currentTime)}</div>
      </div>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => navigate('/relatorio-pedidos')}>
          Relatório de pedidos
        </button>
        <button className="modal-button" onClick={() => navigate('/relatorio-produtos')}>
          Relatório de produtos
        </button>
        <button className="modal-button" onClick={() => navigate('/')}>
          Volver para a página principal
        </button>
      </div>

      <footer className="footer">&copy; 2024 Pinheirinho Restaurant</footer>
    </>
  );
};

export default MainRelatorios;
