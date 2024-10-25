import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (value: number) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, title, onSubmit }) => {
  const [value, setValue] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit(value);
    setValue(0);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <OutlinedInput
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          fullWidth
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <ClearIcon />
        </Button>
        <Button onClick={handleSubmit} color="primary">
          <CheckIcon style={{color: 'green'}}/>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
