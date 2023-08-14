import {create} from 'zustand';

import {createSelectors} from './createSelectors';

const initialState = {
  currentBooking: null,
};

export const useHistoryStore = createSelectors(
  create(set => ({
    ...initialState,
    setCurrentBooking: async booking => {
      set({currentBooking: booking});
    },
  })),
);
