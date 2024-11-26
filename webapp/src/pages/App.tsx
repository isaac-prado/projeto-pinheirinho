import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import Modal from '../components/modal';
import Product from './product';
import CurrencyFormatter from '../utils/currencyFormatter';
import { formatDateToFull } from '../utils/dateFormatter';
import { AttachMoney, Delete, AddCircleOutline } from '@material-ui/icons';
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalType, setModalType] = useState<null | 'register' | 'update' | 'confirmRemove' | 'updatePrice' | 'addProduct'>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({ nome: '', quantidade: 0, preco: 0.0 });

  const initialData: Product[] = [
    { id: '1', nome: 'Produto 1', quantidade: 10, preco: 25.0 },
    { id: '2', nome: 'Produto 2', quantidade: 20, preco: 50.0 },
    { id: '3', nome: 'Produto 3', quantidade: 0, preco: 15.0 },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
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
          <AddCircleOutline className="action-icon" onClick={() => handleOpenModal('addProduct', rowData)} />
          <AttachMoney className="action-icon" onClick={() => handleOpenModal('updatePrice', rowData)} />
          <Delete className="action-icon" onClick={() => handleOpenModal('confirmRemove', rowData)} />
        </div>
      ),
    },
  ];

  const handleOpenModal = (type: 'register' | 'update' | 'confirmRemove' | 'updatePrice' | 'addProduct', product: Product | null = null) => {
    setSelectedProduct(product);
    setModalType(type);
    if (type === 'register') {
      // Reset new product form
      setNewProduct({ nome: '', quantidade: 0, preco: 0.0 });
    } else if (type === 'update' && product) {
      // Populate form fields with the selected product data
      setNewProduct({ nome: product.nome, quantidade: product.quantidade, preco: product.preco });
    }
  };

  const handleAddProduct = () => {
    const newProductData = {
      id: String(tableData.length + 1),
      ...newProduct,
    };
    setTableData((prevData) => [...prevData, newProductData]);
    setModalType(null);
    setNewProduct({ nome: '', quantidade: 0, preco: 0.0 });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setTableData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      )
    );
    setModalType(null);
  };

  const handleRemoveProduct = () => {
    if (selectedProduct) {
      setTableData((prevData) => prevData.filter((product) => product.id !== selectedProduct.id));
      setSelectedProduct(null);
      setModalType(null);
    }
  };

  const handleUpdatePrice = (newPrice: number) => {
    if (selectedProduct) {
      setTableData((prevData) =>
        prevData.map((product) =>
          product.id === selectedProduct.id ? { ...product, preco: newPrice } : product
        )
      );
      setModalType(null);
    }
  };

  const handleAddQuantity = (quantity: number) => {
    if (selectedProduct) {
      setTableData((prevData) =>
        prevData.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantidade: product.quantidade + quantity }
            : product
        )
      );
      setModalType(null);
    }
  };

  const handleReduceQuantity = (productId: string) => {
    setTableData((prevData) =>
      prevData.map((product) =>
        product.id === productId
          ? { ...product, quantidade: Math.max(product.quantidade - 1, 0) }
          : product
      )
    );
  };

  return (
    <>
      <div className="header">
        <img src="/logo-small.jpg" alt="Pinheirinho Restaurant" className="logo" />
        <div className="date-container">{formatDateToFull(currentTime)}</div>
      </div>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => handleOpenModal('register')}>
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

      {/* Modal para Cadastrar Produto */}
      <Modal
        isOpen={modalType === 'register' || modalType === 'update'}
        onClose={() => setModalType(null)}
        title={modalType === 'register' ? 'Cadastrar Produto' : 'Alterar Produto'}
        onSubmit={() => (modalType === 'register' ? handleAddProduct() : selectedProduct && handleUpdateProduct(selectedProduct))}
      >
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newProduct.nome}
          onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={newProduct.quantidade}
          onChange={(e) => setNewProduct({ ...newProduct, quantidade: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={newProduct.preco}
          onChange={(e) => setNewProduct({ ...newProduct, preco: Number(e.target.value) })}
        />
      </Modal>

      {/* Modal para Alterar Preço */}
      <Modal
        isOpen={modalType === 'updatePrice'}
        onClose={() => setModalType(null)}
        title="Alterar Preço"
        onSubmit={() => selectedProduct && handleUpdatePrice(newProduct.preco)}
      >
        <input
          type="number"
          placeholder="Novo Preço"
          value={newProduct.preco}
          onChange={(e) => setNewProduct({ ...newProduct, preco: Number(e.target.value) })}
        />
      </Modal>

      {/* Modal de Confirmação para Remover Produto */}
      <Modal
        isOpen={modalType === 'confirmRemove'}
        onClose={() => setModalType(null)}
        title="Confirmar Remoção"
        onSubmit={handleRemoveProduct}
        variant="remove"
      >
        <div>Tem certeza de que deseja remover o produto {selectedProduct?.nome}?</div>
      </Modal>
    </>
  );
};

export default ProductPage;
