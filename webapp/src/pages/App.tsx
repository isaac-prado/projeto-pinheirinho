import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import Modal from '../components/modal';
import Product from '../domain/product';
import CurrencyFormatter from '../utils/currencyFormatter';
import { formatDateToFull } from '../utils/dateFormatter';
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', action: '' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const initialData: Product[] = [
    { id: '1', nome: 'Produto 1', quantidade: 10, preco: 25.0 },
    { id: '2', nome: 'Produto 2', quantidade: 20, preco: 50.0 },
    { id: '3', nome: 'Produto 3', quantidade: 0, preco: 15.0 },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  const filteredTableData = tableData.filter((product) =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.includes(searchQuery)
  );

  const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'ID', field: 'id' },
    { title: 'Quantidade em Estoque', field: 'quantidade' },
    {
      title: 'Preço',
      field: 'preco',
      render: (rowData: Product) => CurrencyFormatter.formatToBRL(rowData.preco ?? 0),
    },
    {
      title: 'Ações',
      field: 'actions',
      render: (rowData: Product) => (
        <div className="action-icons">
          <button onClick={() => handleOpenModal(rowData, 'update')}>Alterar</button>
          <button onClick={() => handleOpenModal(rowData, 'remove')}>Remover</button>
        </div>
      ),
    },
  ];

  const handleOpenModal = (rowData: Product, action: string) => {
    setSelectedProduct(rowData);
    setModalConfig({
      title: action === 'update' ? 'Alterar Produto' : 'Remover Produto',
      action,
    });
    setIsModalOpen(true);
  };

  const handleAddProduct = (product: Product) => {
    setTableData((prevData) => [...prevData, product]);
    setUserModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setTableData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? { ...product, quantidade: updatedProduct.quantidade, preco: updatedProduct.preco } : product
      )
    );
    setIsModalOpen(false);
  };

  const handleRemoveProduct = (productId: string) => {
    const productToRemove = tableData.find((product) => product.id === productId);
    if (productToRemove && productToRemove.quantidade > 0) {
      setRemoveModalOpen(true);
    } else {
      setTableData((prevData) => prevData.filter((product) => product.id !== productId));
    }
  };

  const confirmRemoveProduct = () => {
    if (selectedProduct) {
      setTableData((prevData) => prevData.filter((product) => product.id !== selectedProduct.id));
      setRemoveModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleReduceQuantity = (productId: string) => {
    setTableData((prevData) =>
      prevData.map((product) =>
        product.id === productId
          ? { ...product, quantidade: product.quantidade > 0 ? product.quantidade - 1 : 0 }
          : product
      )
    );
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
        <button className="modal-button" onClick={() => setUserModalOpen(true)}>
          Cadastrar Produto
        </button>
        <input
          type="text"
          placeholder="Buscar produto por nome ou ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <Table title="Gestão de Produtos" columns={columns} data={filteredTableData} />

      <footer className="footer">&copy; 2024 Pinheirinho Restaurant</footer>

      {/* Modal para Adicionar Produto */}
      <Modal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        title="Cadastrar Produto"
        onSubmit={handleAddProduct}
        variant="register"
      />

      {/* Modal para Alterar ou Remover Produto */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        onSubmit={
          modalConfig.action === 'update'
            ? handleUpdateProduct
            : () => handleRemoveProduct(selectedProduct?.id ?? '')
        }
        product={selectedProduct}
      />

      {/* Modal de Confirmação para Remover Produto */}
      <Modal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        title="Confirmar Remoção"
        onSubmit={confirmRemoveProduct}
        variant="remove"
      >
        <div>Tem certeza de que deseja remover o produto {selectedProduct?.nome}?</div>
      </Modal>
    </>
  );
};

export default ProductPage;
