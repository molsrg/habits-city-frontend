// services/modal.service.ts
import { reactive } from 'vue';

const modalState = reactive({
  modals: {},
});

const modalService = {
  open(modalName: string) {
    modalState.modals[modalName] = true;
  },
  close(modalName: string) {
    modalState.modals[modalName] = false;
  },
  isOpen(modalName: string) {
    return !!modalState.modals[modalName];
  },
};

export { modalService };
