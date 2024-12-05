import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/table';
import CustomerService from '../services/customerService';
import { customerMock } from '../services/customerService';
import './App.css';
import Modal from '../components/modal';
import CurrencyFormatter from '../utils/currencyFormatter';
import Customer from '../domain/customer';
import { ArrowRightSharp, AttachMoney, ShoppingCart} from '@material-ui/icons';
import { formatDateToFull } from '../utils/dateFormatter';
import OrderPage from '../components/productPage/OrderPage';

const App: React.FC = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', action: '' });
  const [selectedRow, setSelectedRow] = useState<Customer | null>(null);
  const [tableData, setTableData] = useState<Customer[]>(customerMock);

  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  
  const [showOrderTable, setShowOrderTable] = useState<boolean>(false);

 

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">{formatDateToFull(currentTime)}</div>
      </div>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => window.location.href = '/relatorio-pedidos'}>
          Relatório de pedidos
        </button>
        <button className="modal-button" onClick={() => window.location.href = '/relatorio-produtos'}>
          Relatório de produtos
        </button>
      </div>

      
      
      <footer className="footer">&copy; 2024 Pinheirinho Restaurant</footer>
    </>
  );
};

export default App;
