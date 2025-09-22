import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const recommended = [
  { name: 'Fresh Lemon', price: '$12', icon: 'emoji-food-beverage' as const },
  { name: 'Green Tea', price: '$06', icon: 'local-cafe' as const },
  { name: 'Fresh Lettuce', price: '$10', icon: 'spa' as const },
];

export default function GroceryHomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>  
      <View style={[styles.header, { backgroundColor: colors.primary }]}>  
        <Text style={styles.headerText}>Hey, Halal</Text>
        <TouchableOpacity style={styles.notification}>
          <Ionicons name="notifications" size={22} color={colors.secondary} />
          <View style={styles.badge} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.background} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products or store"
            placeholderTextColor={colors.background}
          />
        </View>
        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryText}>DELIVERY TO</Text>
          <Text style={styles.deliveryValue}>Green Way 3000, Sylhet</Text>
          <Text style={styles.deliveryText}>WITHIN</Text>
          <Text style={styles.deliveryValue}>1 Hour</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.galleryRow}>
          <View style={[styles.galleryCard, { backgroundColor: colors.secondary }]}>  
            <MaterialIcons name="store" size={40} color={colors.background} />
          </View>
          <View style={[styles.galleryCard, { backgroundColor: colors.secondary }]}>  
            <MaterialIcons name="store" size={40} color={colors.background} />
          </View>
        </View>
        <Text style={styles.recommendedTitle}>Recommended</Text>
        <View style={styles.recommendedRow}>
          {recommended.map((item, idx) => (
            <View key={idx} style={styles.recommendedCard}>
              <MaterialIcons name={item.icon} size={32} color={colors.primary} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productType}>Organic</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>Unit {item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color={colors.background} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color={colors.secondary} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="grid" size={24} color={colors.icon} />
          <Text style={styles.tabText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart" size={24} color={colors.icon} />
          <Text style={styles.tabText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="menu" size={24} color={colors.icon} />
          <Text style={styles.tabText}>More</Text>
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
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  notification: {
    position: 'absolute',
    top: 36,
    right: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FB923C',
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  deliveryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  deliveryValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  galleryRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  galleryCard: {
    width: 140,
    height: 90,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#11181C',
  },
  recommendedRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  },
  recommendedCard: {
    width: 110,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productName: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 2,
    color: '#11181C',
  },
  productType: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 13,
    color: '#11181C',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 4,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#11181C',
  },
});
