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
    Add:React.forwardRef((props, ref) =><Add/>),
    Check:React.forwardRef((props, ref) =><Check/>),
    Clear:React.forwardRef((props, ref) =><Clear/>),
    Delete:React.forwardRef((props, ref) =><DeleteOutline/>),
    Edit:React.forwardRef((props, ref) =><Edit/>),
    Filter:React.forwardRef((props, ref) =><Edit/>),
    FirstPage:React.forwardRef((props, ref) =><FirstPage/>),
    LastPage:React.forwardRef((props, ref) =><LastPage/>),
    NextPage:React.forwardRef((props, ref) =><ChevronRight/>),
    PreviousPage:React.forwardRef((props, ref) =><ChevronLeft/>),
    ResetSearch:React.forwardRef((props, ref) =><Clear/>),
    Search:React.forwardRef((props, ref) =><Search/>),
    SortArrow:React.forwardRef((props, ref) =><ArrowUpward/>),
    AttachMoney:React.forwardRef((props, ref) =><AttachMoney/>),
    ShoppingCart:React.forwardRef((props, ref) =><ShoppingCart />),
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
