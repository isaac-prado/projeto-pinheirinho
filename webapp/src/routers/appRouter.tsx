import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import MainRelatorios from '../pages/relatorios/main-relatorios';
import RelatorioPedidos from '../pages/relatorios/relatorio-pedidos';
import RelatorioProdutos from '../pages/relatorios/relatorio-produtos';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/relatorios" Component={MainRelatorios} />
        <Route path="/relatorio-pedidos" Component={RelatorioPedidos} />
        <Route path="/relatorio-produtos" Component={RelatorioProdutos} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
