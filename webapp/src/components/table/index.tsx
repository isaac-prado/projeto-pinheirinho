import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { Switch } from '@material-ui/core';
import { Add, Edit, DeleteOutline, Check, Clear, AttachMoney, ShoppingCart, Search, FirstPage, LastPage, ChevronRight, ChevronLeft, ArrowUpward } from "@material-ui/icons";
import ActionModal from '../modal'
import './index.css';


interface RowData {
  name: string;
  isActive: boolean;
  credit: number;
}

interface TableProps {
  title: string;
  columns: any[];
  data: RowData[];
  detailPanel?: any | null;
}

const Table: React.FC<TableProps> = ({ title, columns, data, detailPanel }) => {
  const tableIcons: any = {
    Add:React.forwardRef((_) =><Add/>),
    Check:React.forwardRef((_) =><Check/>),
    Clear:React.forwardRef((_) =><Clear/>),
    Delete:React.forwardRef((_) =><DeleteOutline/>),
    Edit:React.forwardRef((_) =><Edit/>),
    Filter:React.forwardRef((_) =><Edit/>),
    FirstPage:React.forwardRef((_) =><FirstPage/>),
    LastPage:React.forwardRef((_) =><LastPage/>),
    NextPage:React.forwardRef((_) =><ChevronRight/>),
    PreviousPage:React.forwardRef((_) =><ChevronLeft/>),
    ResetSearch:React.forwardRef((_) =><Clear/>),
    Search:React.forwardRef((_) =><Search/>),
    SortArrow:React.forwardRef((_) =><ArrowUpward/>),
    AttachMoney:React.forwardRef((_) =><AttachMoney/>),
    ShoppingCart:React.forwardRef((_) =><ShoppingCart />),
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', action: '' });
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [tableData, setTableData] = useState(data);

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
      const updatedData = tableData.map((row) => {
        if (row.name === selectedRow.name) {
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




  const tableColumns = [
    ...columns,
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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <MaterialTable
        detailPanel={detailPanel}
        title={title}
        columns={tableColumns}
        data={tableData}
        icons={tableIcons}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#0d3530',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#EEE',
          },
          showFirstLastPageButtons: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Nenhum registro para exibir',
          },
          toolbar: {
            searchTooltip: 'Pesquisar',
            searchPlaceholder: 'Pesquisar',
          },
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsPerPage: 'Linhas por página:',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página',
          },
          header: {
            actions: 'Ações',
          },
        }}
      />
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default Table;
