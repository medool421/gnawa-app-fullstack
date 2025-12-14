import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      userEmail: null,

      setBookings: (bookings) => set({ bookings }),
      
      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),
      
      removeBooking: (confirmationCode) =>
        set((state) => ({
          bookings: state.bookings.filter(
            (b) => b.confirmation_code !== confirmationCode
          ),
        })),
      
      setUserEmail: (email) => set({ userEmail: email }),
      
      clearStore: () => set({ bookings: [], userEmail: null }),
    }),
    {
      name: 'gnawa-booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);