import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArtist } from '../../services/queries';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../constants/colors';

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: artist, isLoading, error } = useArtist(parseInt(id));

  if (isLoading) return <LoadingSpinner />;

  if (error || !artist) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
        <Text style={styles.errorText}>Artiste non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Artist Image */}
      <Image source={{ uri: artist.image_url }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>{artist.name}</Text>

        {/* Performance Time */}
        <View style={styles.timeCard}>
          <Ionicons name="time-outline" size={24} color={COLORS.accent} />
          <View style={styles.timeContent}>
            <Text style={styles.timeLabel}>Heure de Performance</Text>
            <Text style={styles.timeValue}>
              {artist.performance_time?.slice(0, 5) || 'TBA'}
            </Text>
          </View>
        </View>

        {/* Event Info */}
        {artist.event && (
          <View style={styles.eventCard}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{artist.event.title}</Text>
              <Text style={styles.eventLocation}>{artist.event.location}</Text>
            </View>
          </View>
        )}

        {/* Biography */}
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Biographie</Text>
          <Text style={styles.bioText}>{artist.bio}</Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push('/booking_form')}
          activeOpacity={0.8}
        >
          <Ionicons name="ticket" size={20} color={COLORS.text} />
          <Text style={styles.bookButtonText}>Réserver des Billets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  timeContent: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bioSection: {
    marginBottom: 24,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
  },
});