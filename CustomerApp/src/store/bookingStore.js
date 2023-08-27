import {create} from 'zustand';

import {createSelectors} from './createSelectors';
import {io} from 'socket.io-client';

const initialState = {
  socket: null,
  isSocketConnected: false,
  origin: null,
  destination: null,
  booking: null,
  loading: true,
};

export const useBookingStore = createSelectors(
  create((set, get) => ({
    ...initialState,
    setSocket: () => {
      console.log('connect...');
      const socket = io('https://gofast-api.onrender.com/notification');
      set({socket});
    },
    setLocation: ({origin, destination}) => {
      set({origin, destination});
    },
    setBooking: booking => {
      set({booking});
    },
    waitingDriver: bookingId => {
      const socket = get().socket;
      if (!socket) return;
      socket.emit('createBooking', bookingId);
      // isSocketConnectedRef.current = true;
      socket.on('bookingUpdate', async updatedBooking => {
        console.log(updatedBooking);
        set({booking: updatedBooking}); // Todo implement zustand
      });
    },
    cancelBooking: bookingId => {
      //
      set({origin: null, destination: null});
    },
    acceptBooking: bookingId => {
      //
      set({origin: null, destination: null});
    },
    disconnect: () => {
      const socket = get().socket;
      if (!socket) return;
      socket.disconnect();
    },
  })),
);
