import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const recentSearches = [
  'Organic apples',
  'Wireless headphones',
  'Coffee beans',
  'Cotton t-shirt',
  'Yoga mat',
];

const popularSearches = [
  'Fresh fruits',
  'Electronics',
  'Fashion',
  'Home decor',
  'Sports equipment',
  'Books',
  'Beauty products',
  'Kitchen appliances',
];

const searchResults = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 25.99,
    originalPrice: 29.99,
    image: '🍎',
    category: 'Groceries',
    rating: 4.5,
    store: 'Fresh Market',
  },
  {
    id: '2',
    name: 'Green Apples',
    price: 22.99,
    image: '🍏',
    category: 'Groceries',
    rating: 4.3,
    store: 'Fresh Market',
  },
  {
    id: '3',
    name: 'Apple Juice',
    price: 18.99,
    originalPrice: 22.99,
    image: '🧃',
    category: 'Beverages',
    rating: 4.2,
    store: 'Beverage World',
  },
  {
    id: '4',
    name: 'Apple Pie',
    price: 45.99,
    image: '🥧',
    category: 'Bakery',
    rating: 4.7,
    store: 'Sweet Bakery',
  },
];

const filters = [
  { id: 'price', name: 'Price', icon: 'pricetag-outline' as const },
  { id: 'rating', name: 'Rating', icon: 'star-outline' as const },
  { id: 'category', name: 'Category', icon: 'grid-outline' as const },
  { id: 'location', name: 'Location', icon: 'location-outline' as const },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 500);
    } else {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const renderSearchResult = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity 
      style={[styles.resultItem, { backgroundColor: colors.cardBackground }]}
      onPress={() => router.push('/product-details')}
    >
      <Text style={styles.resultImage}>{item.image}</Text>
      
      <View style={styles.resultInfo}>
        <Text style={[styles.resultName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.resultCategory, { color: colors.textSecondary }]}>
          {item.category} • {item.store}
        </Text>
        
        <View style={styles.resultRating}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={[styles.rating, { color: colors.textSecondary }]}>{item.rating}</Text>
        </View>

        <View style={styles.resultPriceContainer}>
          <Text style={[styles.resultPrice, { color: colors.primary }]}>
            R{item.price.toFixed(2)}
          </Text>
          {item.originalPrice && (
            <Text style={[styles.resultOriginalPrice, { color: colors.textSecondary }]}>
              R{item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRecentSearch = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.recentItem}
      onPress={() => handleSearch(item)}
    >
      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
      <Text style={[styles.recentText, { color: colors.text }]}>{item}</Text>
      <TouchableOpacity>
        <Ionicons name="close" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPopularSearch = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.popularItem, { backgroundColor: colors.cardBackground }]}
      onPress={() => handleSearch(item)}
    >
      <Text style={[styles.popularText, { color: colors.text }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search products, stores..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      {!searchQuery ? (
        <View style={styles.content}>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Searches</Text>
                <TouchableOpacity>
                  <Text style={[styles.clearAll, { color: colors.primary }]}>Clear All</Text>
                </TouchableOpacity>
              </View>
              {recentSearches.map(renderRecentSearch)}
            </View>
          )}

          {/* Popular Searches */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Searches</Text>
            <View style={styles.popularContainer}>
              {popularSearches.map(renderPopularSearch)}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          {/* Filters */}
          <View style={styles.filtersContainer}>
            <Text style={[styles.resultsCount, { color: colors.text }]}>
              {searchResults.length} results for "{searchQuery}"
            </Text>
            <View style={styles.filters}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: selectedFilter === filter.id ? colors.primary : colors.cardBackground,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setSelectedFilter(selectedFilter === filter.id ? null : filter.id)}
                >
                  <Ionicons
                    name={filter.icon}
                    size={16}
                    color={selectedFilter === filter.id ? '#fff' : colors.text}
                  />
                  <Text style={[
                    styles.filterText,
                    { color: selectedFilter === filter.id ? '#fff' : colors.text }
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Search Results */}
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                Searching...
              </Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.resultsList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    gap: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  clearAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  popularText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  resultsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultImage: {
    fontSize: 40,
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 12,
    marginBottom: 6,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
  },
  resultPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  resultOriginalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  favoriteButton: {
    padding: 10,
  },
});