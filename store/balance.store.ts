import { defineStore } from 'pinia';

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: 0,
    balanceStat: {
      History: {},
      Summary: {},
    },
  }),
  getters: {
    getBalanceStat(state) {
      return state.balanceStat;
    },
  },
  actions: {
    fetchBalanceUser() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const getRandomData = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      this.balanceStat.History = {
        labels: months,
        data: months.map(() => getRandomData(50, 70)),
      };
      
      this.balanceStat.Summary = {
        labels: ['От выполнения задач', 'От рефералов', 'От получения достижений', 'От обратной связи'],
        data: [170, 35, 70, 14].map(() => getRandomData(10, 200)),
      };
    },
  },
});
