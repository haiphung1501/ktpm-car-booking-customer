import {create} from 'zustand';

import {createSelectors} from './createSelectors';
import {io} from 'socket.io-client';

const initialState = {
  socket: null,
  isSocketConnected: false,
  orders: [],
  loading: true,
};

export const useGlobalStore = createSelectors(
  create((set, get) => ({
    ...initialState,
    setSocket: () => {
      console.log('connect...');
      const socket = io('https://gofast-api.onrender.com/notification');
      set({socket});
    },
    subscribeSocket: userInfo => {
      const socket = get().socket;
      const isSocketConnected = get().isSocketConnected;

      console.log('subscribe...', {socket, isSocketConnected});
      if (!socket) return;

      if (!isSocketConnected) {
        socket.emit('driverAvailable', userInfo._id);
        set({isSocketConnected: true});
        console.log('Check');
        //TODO newBookings to global
        socket.on('newBooking', newBookings => {
          console.log('new booking');
          set({orders: newBookings});
        });
      }
    },
    emitAcceptBookingEvent: bookingId => {
      const socket = get().socket;
      if (!socket) return;

      socket.emit('acceptBooking', bookingId);
      socket.on('bookingUpdate', updatedBooking => {
        console.log('Received booking update:', updatedBooking.bookingStatus);
      });
    },
    disconnect: () => {
      const socket = get().socket;
      if (!socket) return;
      socket.disconnect();
    },
  })),
);
