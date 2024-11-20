import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import CustomerService, { customerMock } from '../services/customerService';
import './App.css';
import Modal from '../components/modal';
import CurrencyFormatter from '../utils/currencyFormatter';
import Customer from '../domain/customer';
import { ArrowRightSharp, AttachMoney, ShoppingCart } from '@material-ui/icons';
import { Switch } from '@material-ui/core';
import { formatDateToFull } from '../utils/dateFormatter';
import OrderPage from './Order/OrderPage';

const App: React.FC = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', action: '' });
  const [selectedRow, setSelectedRow] = useState<Customer | null>(null);
  const [tableData, setTableData] = useState<Customer[]>(customerMock);
  
  const [showOrderTable, setShowOrderTable] = useState<boolean>(false);

  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'Crédito', field: 'credit', 
      render: (rowData: Customer) => CurrencyFormatter.formatToBRL(rowData.credit ?? 0) },
    {
      title: 'Ativo',
      field: 'isActive',
      render: (rowData: Customer) => (
        <Switch checked={rowData.isActive} color="primary" disabled />
      ),
    },
    {
      title: 'Ações',
      field: 'actions',
      render: (rowData: Customer) => (
        <div className="action-icons">
          <AttachMoney className="action-icon" name = "icon dinheiro"  onClick={() => handleOpenModal(rowData, 'updateCredit')} />
          <ShoppingCart className="action-icon" onClick={() => handleOpenModal(rowData, 'addOrder')} />
        </div>
      ),
    },
  ];

  const customerDetail: any = [
    {
      icon: React.forwardRef((_) => <ArrowRightSharp/>),
      tooltip: 'Ver detalhes',
      render: (rowData: Customer) => {
        return (
          <div
            style={{
              backgroundColor: '#f9f9f6',
            }}
          >
            <table id="customerDetail">
              <thead>
                <tr>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>CPF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{rowData.phone}</td>
                  <td>{rowData.email ?? '-'}</td>
                  <td>{rowData.cpf}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
    },
  ]

  const handleOpenModal = (rowData: Customer, action: string) => {
    setSelectedRow(rowData);
    setModalConfig({
      title: action === 'updateCredit' ? 'Adicionar crédito' : 'Adicionar pedido',
      action,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (value: number) => {
    if (selectedRow) {
      const updatedData = tableData.map((row) => {
        if (row.name === selectedRow.name) { //debit? 
          return modalConfig.action === 'updateCredit'
            ? { ...row, credit: row.credit + value }
            : { ...row, credit: row.credit - value };
        }
        return row;
      });
      setTableData(updatedData);
      setIsModalOpen(false);
    }
  };

  const customerService = new CustomerService();

  const handleAddUser = async (data: Customer) => {
    try {
      await customerService.addCustomer(data);
      setTableData((prevData) => [...prevData, data])
      setUserModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleRemoveUser = async (data: { cpf: string }) => {
    try {
      await customerService.removeCustomer(data.cpf);
      setTableData((prevData) =>
        prevData.filter((cliente) => cliente.cpf !== data.cpf)
      );
      setRemoveModalOpen(false);
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">{formatDateToFull(currentTime)}</div>
      </div>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => setShowOrderTable(!showOrderTable)}>
          {showOrderTable ? "Tela Inicial" : "Histórico de Pedidos"}
        </button>
        <button className="modal-button" onClick={() => setUserModalOpen(true)}>
          Adicionar Cliente
        </button>
        <button className="modal-button" onClick={() => setRemoveModalOpen(true)}>
          Remover Cliente
        </button>
      </div>

      {!showOrderTable 
        ? <Table title="Gestão de assinaturas" columns={columns} data={tableData}
          detailPanel={customerDetail}/>
        : <OrderPage />
      }
      
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

      {/* Modal para ações da tabela */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        onSubmit={handleSubmit} 
      />
    </>
  );
};

export default App;
