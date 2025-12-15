import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  StyleSheet,
  RefreshControl,
  TouchableOpacity 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArtists } from '../../services/queries';
import ArtistCard from '../../components/ArtistCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../constants/colors';

export default function ArtistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  

  React.useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500);
  return () => {
    clearTimeout(handler);
  };
}, [searchQuery]);

  const { 
    data: response, 
    isLoading, 
    error,
    refetch,
    isRefetching,
    isFetching
  } = useArtists({ 
    page, 
    limit: 10, 
    search: debouncedSearch 
  });

  const handleArtistPress = (artist) => {
    router.push(`/artist/${artist.id}`);
  };

  const handleNextPage = () => {
    if (pagination && page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
        <Text style={styles.errorText}>Erreur de chargement</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
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
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
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
            onRefresh={() => {
              setPage(1);
              refetch();
            }}
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
            <View style={styles.footerContainer}>
              {/* Info pagination */}
              <View style={styles.paginationInfo}>
                <Text style={styles.paginationText}>
                  Page {pagination.currentPage} sur {pagination.totalPages}
                </Text>
                <Text style={styles.paginationSubtext}>
                  {pagination.totalItems} artiste(s) au total
                </Text>
              </View>

              {/* Boutons de pagination */}
              {pagination.totalPages > 1 && (
                <View style={styles.paginationButtons}>
                  {/* Bouton Précédent */}
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      page === 1 && styles.paginationButtonDisabled
                    ]}
                    onPress={handlePrevPage}
                    disabled={page === 1 || isFetching}
                  >
                    <Ionicons 
                      name="chevron-back" 
                      size={24} 
                      color={page === 1 ? COLORS.textSecondary : COLORS.primary} 
                    />
                    <Text style={[
                      styles.paginationButtonText,
                      page === 1 && styles.paginationButtonTextDisabled
                    ]}>
                      Précédent
                    </Text>
                  </TouchableOpacity>

                  {/* Bouton Suivant */}
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      page >= pagination.totalPages && styles.paginationButtonDisabled
                    ]}
                    onPress={handleNextPage}
                    disabled={page >= pagination.totalPages || isFetching}
                  >
                    <Text style={[
                      styles.paginationButtonText,
                      page >= pagination.totalPages && styles.paginationButtonTextDisabled
                    ]}>
                      Suivant
                    </Text>
                    <Ionicons 
                      name="chevron-forward" 
                      size={24} 
                      color={page >= pagination.totalPages ? COLORS.textSecondary : COLORS.primary} 
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Loading indicator pendant le fetch */}
              {isFetching && (
                <View style={styles.loadingIndicator}>
                  <LoadingSpinner size="small" />
                  <Text style={styles.loadingText}>Chargement...</Text>
                </View>
              )}
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
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    paddingVertical: 16,
  },
  paginationInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  paginationSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  paginationButtonDisabled: {
    opacity: 0.5,
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  paginationButtonTextDisabled: {
    color: COLORS.textSecondary,
  },

  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});