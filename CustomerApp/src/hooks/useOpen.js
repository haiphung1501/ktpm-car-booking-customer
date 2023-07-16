import {useMemo, useState} from 'react';

const useOpen = () => {
  const [open, setOpen] = useState('close');

  const onOpen = () => {
    setOpen('open');
  };

  const onClose = () => {
    setOpen('close');
  };

  return {open, onClose, onOpen};
};

export default useOpen;
