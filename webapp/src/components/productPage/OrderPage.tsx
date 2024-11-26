import React, { useState } from 'react';
import { ZoomIn } from '@material-ui/icons';
import Table from "../../components/table";
import Order from "../../domain/order";
import { orderMock } from "../../services/orderService";
import CurrencyFormatter from "../../utils/currencyFormatter";
import { formatDateToShort } from "../../utils/dateFormatter";
import { Modal, Box, Typography, Button } from '@material-ui/core';
import './orderPageModal.css';

const OrderPage: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'detail' | 'summary'>('detail');
  const [summaryData, setSummaryData] = useState({ totalItems: 0, totalValue: 0 });

  const handleOpenModal = (rowData: Order | null, contentType: 'detail' | 'summary') => {
    setModalContent(contentType);
    if (contentType === 'detail' && rowData) {
      setSelectedRow(rowData);
    } else {
      calculateSummary();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const calculateSummary = () => {
    const totalItems = orderMock.length;
    const totalValue = orderMock.reduce((sum, order) => sum + order.totalAmount, 0);
    setSummaryData({ totalItems, totalValue });
  };

  const columns = [
    { title: 'Cod.', field: 'cod' },
    {
      title: 'Data', field: 'date',
      render: (rowData: Order) => formatDateToShort(new Date(rowData.date)),
    },
    { title: 'Cliente', field: 'name' },
    {
      title: 'Valor Total', field: 'totalAmount', filtering: false,
      render: (rowData: Order) => CurrencyFormatter.formatToBRL(rowData.totalAmount),
    },
    {
      title: 'Detalhar Pedido',
      field: 'actions',
      filtering: false,
      render: (rowData: Order) => (
        <div className="action-icons">
          <ZoomIn
            className="action-icon"
            onClick={() => handleOpenModal(rowData, 'detail')}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        title="Pedidos"
        columns={columns}
        data={orderMock}
        isFiltering={true}
      />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null, 'summary')}
          style={{
            textTransform: 'none', 
            backgroundColor: '#0d3530', 
            color: '#fff', 
          }}
        >
          Detalhar Total
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-title" variant="h6" component="h2">
            {modalContent === 'detail' ? 'Detalhes do Pedido' : 'Resumo dos Pedidos'}
          </Typography>
          {modalContent === 'detail' && selectedRow && (
            <>
              <Typography id="modal-description" style={{ marginTop: '16px' }}>
                <strong>Cod:</strong> {selectedRow.cod}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedRow.status}
              </Typography>
              <Typography>
                <strong>Lista de itens:</strong> {selectedRow.lista}
              </Typography>
              <Typography>
                <strong>Preferências:</strong> {selectedRow.pref}
              </Typography>
              <Typography>
                <strong>Data:</strong> {formatDateToShort(new Date(selectedRow.date))}
              </Typography>
              <Typography>
                <strong>Cliente:</strong> {selectedRow.name}
              </Typography>
              <Typography>
                <strong>Valor Total:</strong> {CurrencyFormatter.formatToBRL(selectedRow.totalAmount)}
              </Typography>
            </>
          )}
          {modalContent === 'summary' && (
            <>
              <Typography id="modal-description" style={{ marginTop: '16px' }}>
                <strong>Total de Pedidos:</strong> {summaryData.totalItems}
              </Typography>
              <Typography>
                <strong>Soma dos Valores:</strong> {CurrencyFormatter.formatToBRL(summaryData.totalValue)}
              </Typography>
            </>
          )}
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            className="modal-close-button"
            style={{
              textTransform: 'none', 
              backgroundColor: '#0d3530', 
              color: '#fff', 
            }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default OrderPage;
