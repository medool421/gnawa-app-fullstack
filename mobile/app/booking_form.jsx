import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCreateBooking } from '../services/mutations';
import { useEvent } from '../services/queries';
import { COLORS } from '../constants/colors';

export default function BookingScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets_count: '1',
  });

  const { data: event } = useEvent();
  const createBooking = useCreateBooking();

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre nom');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return false;
    }
    
    const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone marocain valide');
      return false;
    }
    
    const ticketsCount = parseInt(formData.tickets_count);
    if (isNaN(ticketsCount) || ticketsCount < 1 || ticketsCount > 10) {
      Alert.alert('Erreur', 'Le nombre de billets doit être entre 1 et 10');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      tickets_count: parseInt(formData.tickets_count),
      event_id: event?.id || 1,
    };

    createBooking.mutate(bookingData, {
      onSuccess: (response) => {
        Alert.alert(
          'Réservation Confirmée! 🎉',
          `Votre code de confirmation: ${response.data.confirmation_code}`,
          [
            {
              text: 'Voir mes billets',
              onPress: () => router.push('/bookings'),
            },
          ]
        );
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          tickets_count: '1',
        });
      },
      onError: (error) => {
        Alert.alert(
          'Erreur',
          error.response?.data?.message || 'Une erreur est survenue'
        );
      },
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Réserver vos Billets</Text>
          <Text style={styles.subtitle}>
            Remplissez le formulaire pour confirmer votre réservation
          </Text>

          {/* Event Info Card */}
          {event && (
            <View style={styles.eventCard}>
              <Ionicons name="musical-notes" size={24} color={COLORS.accent} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            </View>
          )}

          {/* Form */}
          <FormInput
            icon="person-outline"
            label="Nom Complet"
            placeholder="Ahmed El Mansouri"
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
          />

          <FormInput
            icon="mail-outline"
            label="Email"
            placeholder="ahmed@example.com"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            icon="call-outline"
            label="Téléphone"
            placeholder="+212612345678"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            keyboardType="phone-pad"
          />

          <FormInput
            icon="ticket-outline"
            label="Nombre de Billets"
            placeholder="1"
            value={formData.tickets_count}
            onChangeText={(value) => updateField('tickets_count', value)}
            keyboardType="number-pad"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              createBooking.isPending && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={createBooking.isPending}
            activeOpacity={0.8}
          >
            {createBooking.isPending ? (
              <>
                <Ionicons name="hourglass-outline" size={20} color={COLORS.text} />
                <Text style={styles.submitButtonText}>Réservation en cours...</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.text} />
                <Text style={styles.submitButtonText}>Confirmer la Réservation</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FormInput({ 
  icon, 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default',
  autoCapitalize = 'words'
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
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
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});