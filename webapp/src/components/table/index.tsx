import React from 'react';
import MaterialTable from 'material-table';
import { Add, Edit, DeleteOutline, Check, Clear, AttachMoney, ShoppingCart, Search, FirstPage, LastPage, ChevronRight, ChevronLeft, ArrowUpward } from "@material-ui/icons";
import './index.css';

interface TableProps {
  title: string;
  columns: any[];
  data: any[];
  detailPanel?: any | null;
  isFiltering?: boolean | undefined;
}

const Table: React.FC<TableProps> = ({ title, columns, data, detailPanel, isFiltering = false }) => {
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

  return (
    <div style={{ maxWidth: '77vw', margin: '0 auto' }}>
      <MaterialTable
        detailPanel={detailPanel}
        title={title}
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
          filtering: isFiltering,
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
    </div>
  );
};

export default Table;
