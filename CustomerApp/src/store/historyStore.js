import {create} from 'zustand';

import {createSelectors} from './createSelectors';

const initialState = {
  bookings: [],
};

export const useHistoryStore = createSelectors(
  create((set, get) => ({
    ...initialState,
    setBookings: async bookings => {
      console.log(bookings);
      set({bookings});
    },
    reviewBooking: id => {
      const _bookings = get().bookings;
      set({
        bookings: _bookings.map(b =>
          b._id === id ? {...b, isReviewed: true} : b,
        ),
      });
    },
    getBooking: id => {
      const _bookings = get().bookings;
      return _bookings.find(b => b._id === id);
    },
  })),
);
