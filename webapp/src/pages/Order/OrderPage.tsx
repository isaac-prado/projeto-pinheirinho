import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import Order from "../../domain/order";
import OrderService from "../../services/orderService";
import CurrencyFormatter from "../../utils/currencyFormatter";
import { formatDateToShort } from "../../utils/dateFormatter";

const OrderPage: React.FC = () => {
  const orderService = new OrderService();
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { title: 'Cliente', field: 'customer.name' },
    {
      title: 'Data',
      field: 'date',
      render: (rowData: Order) => formatDateToShort(new Date(rowData.date)),
    },
    {
      title: 'Valor Total',
      field: 'totalAmount',
      filtering: false,
      render: (rowData: Order) =>
        CurrencyFormatter.formatToBRL(rowData.totalAmount),
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAll();
        setOrderData(data);
      } catch (error) {
        console.error("Erro ao carregar os pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Carregando pedidos...</p>
      ) : (
        <Table title="Pedidos" columns={columns} data={orderData} isFiltering={true} />
      )}
    </>
  );
};

export default OrderPage;
