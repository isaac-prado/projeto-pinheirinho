import React, { useState, useEffect } from 'react';
import Table from '../../components/table';
import Modal from '../../components/modal';
import { AddCircleOutline, AttachMoney, Delete } from '@material-ui/icons';
import CurrencyFormatter from '../../utils/currencyFormatter';
import ProductService from '../../services/productService';
import './ProductPage.css';

interface Product {
  id: string;
  nome: string;
  estoque: number;
  preco: number;
}

const ProductPage: React.FC = () => {
  const [modalType, setModalType] = useState<null | 'register' | 'update' | 'confirmRemove' | 'updatePrice' | 'addProduct' | 'removeProduct'>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState<{ id?: string; nome: string; estoque: number; preco: number }>({ nome: '', estoque: 0, preco: 0.0 });

  const productService = new ProductService();

  useEffect(() => {
    // Cargar los productos del backend
    const loadProducts = async () => {
      const products = await productService.getProducts();
      setTableData(products);
    };
    loadProducts();
  }, []);

  // const initialData: Product[] = [
  //   { id: '1', nome: 'Produto 1', quantidade: 10, preco: 25.0 },
  //   { id: '2', nome: 'Produto 2', quantidade: 20, preco: 50.0 },
  //   { id: '3', nome: 'Produto 3', quantidade: 0, preco: 15.0 },
  // ];

  // useEffect(() => {
  //   setTableData(initialData);
  // }, []);

  const filteredTableData = tableData.filter((product) =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.includes(searchQuery)
  );

  const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'ID', field: 'id' },
    { title: 'Quantidade em Estoque', field: 'estoque' },
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
          <AddCircleOutline className="action-icon" onClick={() => handleOpenModal('update', rowData)} />
          <AttachMoney className="action-icon" onClick={() => handleOpenModal('updatePrice', rowData)} />
          <Delete className="action-icon" onClick={() => handleOpenModal('removeProduct', rowData)} />
        </div>
      ),
    },
  ];

  const handleOpenModal = (type: 'register' | 'update' | 'confirmRemove' | 'updatePrice' | 'addProduct' | 'removeProduct', product: Product | null = null) => {
    setSelectedProduct(product);
    setModalType(type);
    if (type === 'register') {
      setNewProduct({ nome: '', estoque: 0, preco: 0.0 });
    } else if (type === 'update' && product) {
      setNewProduct({ ...product });
    } else if (product) {
      setNewProduct({ nome: product.nome, estoque: product.estoque, preco: product.preco });
    }
  };

  const handleAddProduct = async (newProductData: { nome: string; estoque: number; preco: number }) => {
    try {
      console.log("Datos del nuevo producto:", newProductData);
      await productService.addProduct(newProductData);
  
      const updatedProducts = await productService.getProducts();
      setTableData(updatedProducts);
  
      setNewProduct({ nome: '', estoque: 0, preco: 0.0 });
      setModalType(null);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };
  

  const handleUpdateQuantity = (updatedData: { id: string; quantidade: number }) => {
    setTableData((prevData) => {
      const newData = prevData.map((product) =>
        product.id === updatedData.id
          ? { ...product, quantidade: updatedData.quantidade }
          : product
      );
      return newData;
    });
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

  return (
    <>
      <div className="box-buttons">
        <button className="modal-button" onClick={() => handleOpenModal('register')}>
          Cadastrar Produto
        </button>
      </div>

      <Table title="Gestão de Produtos" data={filteredTableData} columns={columns} />

      {/* Modal para Cadastrar Produto */}
      <Modal
        isOpen={modalType === 'register'}
        onClose={() => setModalType(null)}
        title="Cadastrar Produto"
        onSubmit={handleAddProduct}
        variant="default"
        newProduct={newProduct}  // Pasa newProduct como prop
        setNewProduct={setNewProduct}  // Pasa setNewProduct como prop
      />

      <Modal
        isOpen={modalType === 'update'}
        onClose={() => setModalType(null)}
        title="Alterar Quantidade"
        onSubmit={(data) => handleUpdateQuantity(data)}
        variant="update"
        newProduct={newProduct}
      />

      {/* Modal para Alterar Preço */}
      <Modal
        isOpen={modalType === 'updatePrice'}
        onClose={() => setModalType(null)}
        title="Alterar Preço"
        onSubmit={(data) => handleUpdatePrice(data.preco)}
        variant="updatePrice"
        newProduct={newProduct}
      />

      {/* Modal de Confirmação para Remover Produto */}
      <Modal
        isOpen={modalType === 'removeProduct'}
        onClose={() => setModalType(null)}
        title="Confirmar Remoção"
        onSubmit={handleRemoveProduct}
        variant="removeProduct"
      >
        
      </Modal>
    </>
  );
};

export default ProductPage;
