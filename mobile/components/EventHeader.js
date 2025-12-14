import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function EventHeader({ event, compact = false }) {
  if (!event) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (compact) {
    // Version compacte pour les formulaires
    return (
      <View style={styles.compactContainer}>
        <Ionicons name="musical-notes" size={24} color={COLORS.accent} />
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle}>{event.title}</Text>
          <Text style={styles.compactDate}>{formatDate(event.date)}</Text>
        </View>
      </View>
    );
  }

  // Version complète pour la page d'accueil
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: event.banner_url }} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <View style={styles.iconContainer}>
          <Ionicons name="musical-notes" size={48} color={COLORS.accent} />
        </View>
        
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Full version styles
  container: {
    height: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 38,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    flex: 1,
  },
  
  // Compact version styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  compactDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});