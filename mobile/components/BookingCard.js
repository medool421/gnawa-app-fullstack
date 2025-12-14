import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function BookingCard({ booking, onDelete }) {
  const handleDelete = () => {
    Alert.alert(
      'Annuler la Réservation',
      `Voulez-vous annuler la réservation ${booking.confirmation_code} ?`,
      [
        { text: 'Non', style: 'cancel' },
        { 
          text: 'Oui', 
          style: 'destructive',
          onPress: () => onDelete(booking.confirmation_code)
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Code de Confirmation</Text>
          <Text style={styles.code}>{booking.confirmation_code}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={handleDelete}
          style={styles.deleteButton}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.details}>
        <InfoRow 
          icon="person-outline" 
          label="Nom" 
          value={booking.name} 
        />
        <InfoRow 
          icon="mail-outline" 
          label="Email" 
          value={booking.email} 
        />
        <InfoRow 
          icon="call-outline" 
          label="Téléphone" 
          value={booking.phone} 
        />
        <InfoRow 
          icon="ticket-outline" 
          label="Billets" 
          value={`${booking.tickets_count} ticket(s)`} 
        />
      </View>
    </View>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color={COLORS.textSecondary} />
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: COLORS.accent,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: 8,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginBottom: 16,
  },
  details: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    minWidth: 80,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
  },
});