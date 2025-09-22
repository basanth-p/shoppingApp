import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

const categories = [
  {
    id: '1',
    name: 'Groceries',
    icon: 'local-grocery-store' as const,
    color: '#4CAF50',
    itemCount: 1250,
    subcategories: ['Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Beverages']
  },
  {
    id: '2',
    name: 'Electronics',
    icon: 'devices' as const,
    color: '#2196F3',
    itemCount: 890,
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Accessories']
  },
  {
    id: '3',
    name: 'Fashion',
    icon: 'checkroom' as const,
    color: '#E91E63',
    itemCount: 2100,
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Bags']
  },
  {
    id: '4',
    name: 'Home & Garden',
    icon: 'home' as const,
    color: '#FF9800',
    itemCount: 750,
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Tools']
  },
  {
    id: '5',
    name: 'Sports & Fitness',
    icon: 'sports-soccer' as const,
    color: '#9C27B0',
    itemCount: 450,
    subcategories: ['Exercise Equipment', 'Sports Gear', 'Outdoor', 'Supplements', 'Apparel']
  },
  {
    id: '6',
    name: 'Books & Media',
    icon: 'menu-book' as const,
    color: '#795548',
    itemCount: 320,
    subcategories: ['Books', 'Movies', 'Music', 'Games', 'Magazines']
  },
  {
    id: '7',
    name: 'Health & Beauty',
    icon: 'spa' as const,
    color: '#FF5722',
    itemCount: 680,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Health', 'Fragrances']
  },
  {
    id: '8',
    name: 'Toys & Kids',
    icon: 'toys' as const,
    color: '#607D8B',
    itemCount: 540,
    subcategories: ['Toys', 'Baby Care', 'Kids Clothing', 'Educational', 'Games']
  },
  {
    id: '9',
    name: 'Automotive',
    icon: 'directions-car' as const,
    color: '#3F51B5',
    itemCount: 290,
    subcategories: ['Car Parts', 'Accessories', 'Tools', 'Care Products', 'Electronics']
  },
  {
    id: '10',
    name: 'Pet Supplies',
    icon: 'pets' as const,
    color: '#009688',
    itemCount: 180,
    subcategories: ['Dog Supplies', 'Cat Supplies', 'Food', 'Toys', 'Health']
  },
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: colors.cardBackground },
        selectedCategory === item.id && { borderColor: colors.primary, borderWidth: 2 }
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
          <MaterialIcons name={item.icon} size={28} color="#fff" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.itemCount, { color: colors.textSecondary }]}>
            {item.itemCount} items
          </Text>
        </View>
        <Ionicons 
          name={selectedCategory === item.id ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={colors.textSecondary} 
        />
      </View>
      
      {selectedCategory === item.id && (
        <View style={styles.subcategoriesContainer}>
          {item.subcategories.map((subcategory, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.subcategoryItem, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.subcategoryText, { color: colors.text }]}>
                {subcategory}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Browse all product categories
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search categories..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories List */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoriesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Actions */}
      <View style={[styles.quickActions, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="flash" size={20} color="#fff" />
          <Text style={styles.quickActionText}>Flash Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.secondary }]}>
          <Ionicons name="gift" size={20} color="#fff" />
          <Text style={styles.quickActionText}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: '#4CAF50' }]}>
          <Ionicons name="leaf" size={20} color="#fff" />
          <Text style={styles.quickActionText}>Organic</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  categoryCard: {
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '400',
  },
  subcategoriesContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  subcategoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  quickActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 5,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});