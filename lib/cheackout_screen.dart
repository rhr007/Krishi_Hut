import 'package:flutter/material.dart';

class CheckoutPage extends StatelessWidget {
  final List<Map<String, dynamic>> cartItems = [
    // Sample cart items for demonstration
    {'name': 'Organic Fertilizer', 'price': 120.0, 'quantity': 2},
    {'name': 'Pesticide Spray', 'price': 100.0, 'quantity': 1},
    {'name': 'Agricultural Instruments', 'price': 250.0, 'quantity': 5},
    {'name': 'Digital Instruments', 'price': 1000.0, 'quantity': 5},
    {'name': 'Fresh Vegetables', 'price': 30.0, 'quantity': 5},
    {'name': 'agricultural Medicines', 'price': 125.0, 'quantity': 5},
  ];

  CheckoutPage({super.key});

  double getTotalPrice() {
    return cartItems.fold(
        0, (sum, item) => sum + (item['price'] * item['quantity']));
  }

  void placeOrder(BuildContext context) {
    // Replace this logic with your backend call or Firestore integration
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Order Placed!'),
        content: const Text('Your order has been successfully placed.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Checkout'),
      ),
      body: Column(
        children: [
          // Cart Items List
          Expanded(
            child: ListView.builder(
              itemCount: cartItems.length,
              itemBuilder: (context, index) {
                final item = cartItems[index];
                return ListTile(
                  title: Text(item['name']),
                  subtitle:
                      Text('Price: \$${item['price']} x ${item['quantity']}'),
                  trailing: Text(
                      '\$${(item['price'] * item['quantity']).toStringAsFixed(2)}'),
                );
              },
            ),
          ),

          // Total Price Section
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Total: \$${getTotalPrice().toStringAsFixed(2)}',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 16),

                // Place Order Button
                ElevatedButton(
                  onPressed: () => placeOrder(context),
                  child: Text('Place Order'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
