// services/modal.service.ts
import { reactive } from 'vue';

const modalState = reactive({
  modals: {},
  payloads: {},
});

const modalService = {
  open(modalName: string, payload?: any) {
    modalState.modals[modalName] = true;
    if (payload) {
      modalState.payloads[modalName] = payload;
    }
  },
  close(modalName: string) {
    modalState.modals[modalName] = false;
  },
  isOpen(modalName: string) {
    return !!modalState.modals[modalName];
  },
  getPayload(modalName: string) {
    return modalState.payloads[modalName];
  },
};

export { modalService };
