import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, OutlinedInput, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  variant?: 'default' | 'register' | 'remove';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onSubmit, variant = 'default' }) => {
  const [value, setValue] = useState<number>(0);
  const [cpf, setCpf] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const saldo = 0;

  const handleSubmit = () => {
    if (variant === 'register') {
      onSubmit({ cpf, nome, endereco, telefone, saldo });
      setCpf('');
      setNome('');
      setEndereco('');
      setTelefone('');
    } else if (variant === 'remove') {
      onSubmit({ cpf });
      setCpf('');
    } else {
      onSubmit(value);
      setValue(0);
    }
    onClose(); // Fecha o modal após o envio
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
        ) : (
          <OutlinedInput
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            fullWidth
            name='valor'
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
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
