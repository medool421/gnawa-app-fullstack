import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function ArtistCard({ artist, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: artist.image_url }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {artist.name}
        </Text>
        
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color={COLORS.accent} />
          <Text style={styles.time}>
            {artist.performance_time?.slice(0, 5) || 'TBA'}
          </Text>
        </View>
        
        <Text style={styles.bio} numberOfLines={2}>
          {artist.bio}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: COLORS.accent,
  },
  bio: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});