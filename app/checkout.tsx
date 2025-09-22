import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const orderItems = [
  { id: '1', name: 'Fresh Organic Apples', price: 25.99, quantity: 2, image: '🍎' },
  { id: '2', name: 'Wireless Headphones', price: 899.99, quantity: 1, image: '🎧' },
  { id: '3', name: 'Cotton T-Shirt', price: 199.99, quantity: 3, image: '👕' },
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' as const },
  { id: 'mobile', name: 'Mobile Money', icon: 'phone-portrait-outline' as const },
  { id: 'cash', name: 'Cash on Delivery', icon: 'cash-outline' as const },
];

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('Green Way 3000, Sylhet');
  const [phoneNumber, setPhoneNumber] = useState('+27 123 456 789');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 35;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      `Your order has been placed successfully.\n\nTotal: R${total.toFixed(2)}\nPayment: ${paymentMethods.find(p => p.id === selectedPayment)?.name}\n\nYou will receive a confirmation shortly.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Items */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Items</Text>
          {orderItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemEmoji}>{item.image}</Text>
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.itemQuantity, { color: colors.textSecondary }]}>
                  Qty: {item.quantity}
                </Text>
              </View>
              <Text style={[styles.itemPrice, { color: colors.primary }]}>
                R{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Address</Text>
            <TouchableOpacity>
              <Text style={[styles.changeButton, { color: colors.primary }]}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <TextInput
              style={[styles.addressInput, { color: colors.text }]}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              multiline
            />
          </View>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Phone Number"
            placeholderTextColor={colors.textSecondary}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Payment Method */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                {
                  borderColor: selectedPayment === method.id ? colors.primary : colors.border,
                  backgroundColor: selectedPayment === method.id ? colors.primary + '10' : 'transparent',
                }
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Ionicons
                name={method.icon}
                size={24}
                color={selectedPayment === method.id ? colors.primary : colors.textSecondary}
              />
              <Text style={[
                styles.paymentMethodText,
                { color: selectedPayment === method.id ? colors.primary : colors.text }
              ]}>
                {method.name}
              </Text>
              <View style={[
                styles.radioButton,
                {
                  borderColor: selectedPayment === method.id ? colors.primary : colors.border,
                  backgroundColor: selectedPayment === method.id ? colors.primary : 'transparent',
                }
              ]}>
                {selectedPayment === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Instructions */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Special Instructions</Text>
          <TextInput
            style={[styles.textArea, { borderColor: colors.border, color: colors.text }]}
            placeholder="Add any special delivery instructions..."
            placeholderTextColor={colors.textSecondary}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Order Summary */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              R{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery Fee</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              R{deliveryFee.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tax (15%)</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              R{tax.toFixed(2)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              R{total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Estimated Delivery */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.deliveryInfo}>
            <Ionicons name="time" size={20} color={colors.primary} />
            <View>
              <Text style={[styles.deliveryTitle, { color: colors.text }]}>
                Estimated Delivery
              </Text>
              <Text style={[styles.deliveryTime, { color: colors.textSecondary }]}>
                25-35 minutes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={[styles.bottomContainer, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={[styles.placeOrderButton, { backgroundColor: colors.primary }]}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>
            Place Order • R{total.toFixed(2)}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  section: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 15,
  },
  changeButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    gap: 10,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    gap: 15,
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
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
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  deliveryTime: {
    fontSize: 14,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  placeOrderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});