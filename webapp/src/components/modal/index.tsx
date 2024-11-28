import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, OutlinedInput, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  variant?: 'default' | 'register' | 'remove' | 'update' | 'updatePrice' | 'removeProduct';
  newProduct?: { id?: string, nome: string; estoque: number; preco: number };
  setNewProduct?: React.Dispatch<React.SetStateAction<{ nome: string; estoque: number; preco: number }>>;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onSubmit, newProduct, setNewProduct, variant = 'default' }) => {
  const [nome, setNome] = useState<string>(newProduct?.nome || '');
  const [estoque, setEstoque] = useState<number>(newProduct?.estoque || 0);
  const [preco, setPreco] = useState<number>(newProduct?.preco || 0);

  const [cpf, setCpf] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const saldo = 0; 

  useEffect(() => {
    
    if (newProduct) {
      setNome(newProduct.nome);
      setEstoque(newProduct.estoque);
      setPreco(newProduct.preco);
    }
  }, [newProduct]);

  const handleSubmit = () => {
    let dataToSubmit;

    if (variant === 'register') {
      dataToSubmit = { cpf, nome, endereco, telefone, saldo };
    } else if (variant === 'remove') {
      dataToSubmit = { cpf };
    } else if (variant === 'update') {
      dataToSubmit = { id: newProduct?.id, estoque };
    } else if (variant === 'updatePrice') {
      dataToSubmit = {preco};
    } else if (variant === 'removeProduct') {
      dataToSubmit = {preco};
    } else {
      dataToSubmit = { nome, estoque, preco };
    }

    console.log('Dados enviados:', dataToSubmit);
    onSubmit(dataToSubmit);
    onClose();
  };

  const handleClose = () => {
    if (variant === 'register') {
      setCpf('');
      setNome('');
      setEndereco('');
      setTelefone('');
    } else if (variant === 'remove') {
      setCpf('');
    } else {
      setNome('');
      setEstoque(0);
      setPreco(0);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {variant === 'register' ? (
          <>
            <TextField
              label="CPF"
              fullWidth
              name='cpf'
              margin="normal"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              label="Nome"
              fullWidth
              name='nome'
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              label="Endereço"
              fullWidth
              name='endereco'
              margin="normal"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <TextField
              label="Telefone"
              fullWidth
              name='telefone'
              margin="normal"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </>
        ) : variant === 'remove' ? (
          <TextField
            label="CPF"
            fullWidth
            name='cpf'
            margin="normal"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        ) : variant === 'update' ? (
          <TextField
            label="Nova Quantidade"
            type="number"
            fullWidth
            margin="normal"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
          />
        ) : variant === 'updatePrice' ? (
          <OutlinedInput
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            fullWidth
            margin="dense"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
          />
        ) : variant === 'removeProduct' ? (
          <div>Tem certeza de que deseja remover o produto {nome}?</div>
        ): (
          <>
            <TextField
              label="Nome"
              fullWidth
              name="nome"
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              label="Quantidade"
              fullWidth
              type="number"
              name="quantidade"
              margin="normal"
              value={estoque}
              onChange={(e) => setEstoque(Number(e.target.value))}
            />
            <OutlinedInput
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
              fullWidth
              name='valor'
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          <ClearIcon />
        </Button>
        <Button onClick={handleSubmit} color="primary">
          <CheckIcon style={{ color: 'green' }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
