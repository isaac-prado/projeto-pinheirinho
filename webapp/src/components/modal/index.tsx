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
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleSubmit = () => {
    if (variant === 'register') {
      onSubmit({ cpf, name, address, phone });
      setCpf('');
      setName('');
      setAddress('');
      setPhone('');
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
              margin="normal"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Endereço"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Telefone"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        ) : variant === 'remove' ? (
          <TextField
            label="CPF"
            fullWidth
            margin="normal"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        ) : (
          <OutlinedInput
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            fullWidth
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
