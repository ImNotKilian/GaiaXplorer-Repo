import { create } from 'zustand';

interface RegisterEmpresaModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterEmpresaModal = create<RegisterEmpresaModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRegisterEmpresaModal;
