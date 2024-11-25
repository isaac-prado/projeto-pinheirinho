import Table from "../../components/table";
import Order from "../../domain/order";
import { orderMock } from "../../services/orderService";
import CurrencyFormatter from "../../utils/currencyFormatter";
import { formatDateToShort } from "../../utils/dateFormatter";


const OrderPage: React.FC = () => {
    const columns = [
        { title: 'Cod.', field: 'cod' },
        { title: 'Data', field: 'date',
            render: (rowData: Order) => formatDateToShort(new Date(rowData.date))
         },
        { title: 'Cliente', field: 'name' },
        { title: 'Valor Total', field: 'totalAmount', filtering: false,
            render: (rowData: Order) =>  CurrencyFormatter.formatToBRL(rowData.totalAmount)},
    ];


    return <>
        <Table title="Pedidos" columns={columns} data={orderMock} 
            isFiltering={true}/>
    </>
}

export default OrderPage;