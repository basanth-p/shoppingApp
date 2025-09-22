import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
  originalPrice?: number;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 25.99,
    quantity: 2,
    image: '🍎',
    store: 'Fresh Market',
    originalPrice: 29.99,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 899.99,
    quantity: 1,
    image: '🎧',
    store: 'Tech World',
    originalPrice: 1299.99,
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    price: 199.99,
    quantity: 3,
    image: '👕',
    store: 'Fashion Hub',
    originalPrice: 249.99,
  },
  {
    id: '4',
    name: 'Coffee Beans 1kg',
    price: 149.99,
    quantity: 1,
    image: '☕',
    store: 'Fresh Market',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setCartItems(items => items.filter(item => item.id !== id))
        }
      ]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const deliveryFee = subtotal > 500 ? 0 : 35;
  const total = subtotal + deliveryFee;

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, { backgroundColor: colors.cardBackground }]}>
      <Text style={styles.itemEmoji}>{item.image}</Text>
      
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.storeName, { color: colors.textSecondary }]}>
          from {item.store}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.itemPrice, { color: colors.primary }]}>
            R{item.price.toFixed(2)}
          </Text>
          {item.originalPrice && (
            <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
              R{item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: colors.border }]}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: colors.primary }]}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Shopping Cart</Text>
        </View>
        
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartEmoji}>🛒</Text>
          <Text style={[styles.emptyCartTitle, { color: colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptyCartSubtitle, { color: colors.textSecondary }]}>
            Add some items to get started
          </Text>
          <TouchableOpacity style={[styles.shopButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Shopping Cart</Text>
        <Text style={[styles.itemCount, { color: colors.textSecondary }]}>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Order Summary */}
      <View style={[styles.orderSummary, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.summaryTitle, { color: colors.text }]}>Order Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            R{subtotal.toFixed(2)}
          </Text>
        </View>

        {savings > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#4CAF50' }]}>You Save</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              -R{savings.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Delivery Fee {subtotal > 500 && '(Free over R500)'}
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {deliveryFee === 0 ? 'Free' : `R${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>
            R{total.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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
  itemCount: {
    fontSize: 16,
    fontWeight: '400',
  },
  cartList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cartItem: {
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
  itemEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 12,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderSummary: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});