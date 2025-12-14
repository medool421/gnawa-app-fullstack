import { useQuery } from '@tanstack/react-query';
import { api } from './api';

// Query Keys
export const queryKeys = {
  event: ['event'],
  artists: (params = {}) => ['artists', params],
  artist: (id) => ['artist', id],
  bookingByCode: (code) => ['booking', 'code', code],
  bookingsByEmail: (email, params = {}) => ['bookings', 'email', email, params],
};

// Get Event
export const useEvent = () => {
  return useQuery({
    queryKey: queryKeys.event,
    queryFn: async () => {
      const { data } = await api.get('/event');
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get All Artists
export const useArtists = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.artists(params),
    queryFn: async () => {
      const { data } = await api.get('/artists', { params });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Get Artist by ID
export const useArtist = (id) => {
  return useQuery({
    queryKey: queryKeys.artist(id),
    queryFn: async () => {
      const { data } = await api.get(`/artists/${id}`);
      return data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Get Booking by Confirmation Code
export const useBookingByCode = (code) => {
  return useQuery({
    queryKey: queryKeys.bookingByCode(code),
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${code}`);
      return data.data;
    },
    enabled: !!code,
    staleTime: 1000 * 60,
  });
};

// Get Bookings by Email
export const useBookingsByEmail = (email, params = {}) => {
  return useQuery({
    queryKey: queryKeys.bookingsByEmail(email, params),
    queryFn: async () => {
      const { data } = await api.get(`/bookings/email/${email}`, { params });
      return data;
    },
    enabled: !!email,
    staleTime: 1000 * 30, // 30 seconds
  });
};