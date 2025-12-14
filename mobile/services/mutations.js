import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import { queryKeys } from './queries';
import { useBookingStore } from '../stores/bookingStore';

// Create Booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const addBooking = useBookingStore((state) => state.addBooking);
  const setUserEmail = useBookingStore((state) => state.setUserEmail);

  return useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onSuccess: (response, variables) => {
      // Add to Zustand store
      addBooking(response.data);
      
      // Save user email
      setUserEmail(variables.email);
      
      // Invalidate bookings queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookingsByEmail(variables.email),
      });
      
      console.log('✅ Booking created:', response.message);
    },
    onError: (error) => {
      console.error('❌ Booking creation failed:', error.message);
    },
  });
};

// Delete Booking
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const removeBooking = useBookingStore((state) => state.removeBooking);
  const userEmail = useBookingStore((state) => state.userEmail);

  return useMutation({
    mutationFn: async (confirmationCode) => {
      const { data } = await api.delete(`/bookings/${confirmationCode}`);
      return data;
    },
    onSuccess: (_, confirmationCode) => {
      // Remove from Zustand store
      removeBooking(confirmationCode);
      
      // Invalidate queries
      if (userEmail) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.bookingsByEmail(userEmail),
        });
      }
      
      console.log('✅ Booking deleted');
    },
    onError: (error) => {
      console.error('❌ Booking deletion failed:', error.message);
    },
  });
};