import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  StyleSheet,
  RefreshControl 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArtists } from '../../services/queries';
import ArtistCard from '../../components/ArtistCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../constants/colors';

export default function ArtistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  
  const { 
    data: response, 
    isLoading, 
    error,
    refetch,
    isRefetching 
  } = useArtists({ 
    page, 
    limit: 10, 
    search: searchQuery 
  });

  const handleArtistPress = (artist) => {
    router.push(`/artist/${artist.id}`);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
        <Text style={styles.errorText}>Erreur de chargement</Text>
      </View>
    );
  }

  const artists = response?.data || [];
  const pagination = response?.pagination;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un artiste..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={COLORS.textSecondary}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      {/* Artists List */}
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ArtistCard 
            artist={item} 
            onPress={() => handleArtistPress(item)} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Aucun artiste trouvé</Text>
          </View>
        }
        ListFooterComponent={
          pagination && (
            <View style={styles.paginationContainer}>
              <Text style={styles.paginationText}>
                Page {pagination.currentPage} sur {pagination.totalPages}
              </Text>
              <Text style={styles.paginationText}>
                {pagination.totalItems} artiste(s) au total
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: 16,
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 16,
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
  paginationContainer: {
    alignItems: 'center',
    padding: 16,
    gap: 4,
  },
  paginationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});