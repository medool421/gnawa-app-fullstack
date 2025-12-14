import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  RefreshControl,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBookingStore } from '../../stores/bookingStore';
import { useDeleteBooking } from '../../services/mutations';
import BookingCard from '../../components/BookingCard';
import { COLORS } from '../../constants/colors';

export default function MyBookingsScreen() {
  const bookings = useBookingStore((state) => state.bookings);
  const deleteBooking = useDeleteBooking();

  const handleDelete = (confirmationCode) => {
    deleteBooking.mutate(confirmationCode, {
      onSuccess: () => {
        Alert.alert('Succès', 'Réservation annulée avec succès');
      },
      onError: (error) => {
        Alert.alert(
          'Erreur',
          error.response?.data?.message || 'Impossible d\'annuler la réservation'
        );
      },
    });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="ticket-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>Aucune Réservation</Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas encore réservé de billets
      </Text>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push('/booking_form')}
        activeOpacity={0.8}
      >
        <Text style={styles.bookButtonText}>Réserver Maintenant</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.confirmation_code}
        renderItem={({ item }) => (
          <BookingCard 
            booking={item} 
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          bookings.length === 0 && styles.listContainerEmpty
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={
          bookings.length > 0 && (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {bookings.length} réservation(s)
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});