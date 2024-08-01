import React, { useState } from 'react';
import { Dialog, DialogPanel, Button } from '@tremor/react';

interface ConfirmProps {
  title: string;
  message: string;
  onConfirm: (confirmed: boolean) => void;
}

const Confirm: React.FC<ConfirmProps> = ({ title, message, onConfirm }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleConfirm = (confirmed: boolean) => {
    setIsOpen(false);
    onConfirm(confirmed);
  };

  return (
    <Dialog open={isOpen} onClose={() => handleConfirm(false)} className='z-9999'>
      <DialogPanel className="relative">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => handleConfirm(false)} className="bg-blue-500 text-white">
            Cancelar
          </Button>
          <Button onClick={() => handleConfirm(true)} className="bg-blue-500 text-white">
            Confirmar
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default Confirm;