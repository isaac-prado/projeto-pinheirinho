import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
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
  const handleValueChange = (input: string) => {
    const numericValue = input.replace(/\D/g, '');
    const updatedValue = parseInt(numericValue || '0', 10);
    setValue(updatedValue);
  };

  const formatCurrency = (value: number): string => {
    return (value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handleSubmit = () => {
    onSubmit(value / 100); 
    setValue(0); 
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {variant === 'default' && (
          <OutlinedInput
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            fullWidth
            name="valor"
            value={formatCurrency(value)}
            onChange={(e) => handleValueChange(e.target.value)}
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
