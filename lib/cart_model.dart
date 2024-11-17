// import 'package:flutter/material.dart';

// class CartModel extends ChangeNotifier {
//   final List<Map<String, dynamic>> _cartItems = []; // Cart items list

//   // Getter to access cart items
//   List<Map<String, dynamic>> get cartItems => _cartItems;

//   // Add a product to the cart
//   void addToCart(Map<String, String> product) {
//     // Check if the product already exists in the cart
//     final existingIndex =
//         _cartItems.indexWhere((item) => item['name'] == product['name']);
//     if (existingIndex >= 0) {
//       // If the product is already in the cart, increment the quantity
//       _cartItems[existingIndex]['quantity'] += 1;
//     } else {
//       // Add the product to the cart with a quantity of 1
//       _cartItems.add({
//         ...product,
//         'quantity': 1, // Initial quantity
//       });
//     }
//     notifyListeners(); // Notify listeners to rebuild UI
//   }

//   // Remove a product from the cart
//   void removeFromCart(Map<String, dynamic> product) {
//     _cartItems.removeWhere((item) => item['name'] == product['name']);
//     notifyListeners();
//   }

//   // Calculate the total price of the cart
//   double get totalPrice {
//     return _cartItems.fold(0, (total, item) {
//       final itemPrice =
//           double.tryParse(item['price']!.replaceAll('\$', '')) ?? 0.0;
//       return total + (item['quantity'] * itemPrice);
//     });
//   }

//   // Clear the cart
//   void clearCart() {
//     _cartItems.clear();
//     notifyListeners();
//   }
// }

import 'package:flutter/foundation.dart';

class CartModel with ChangeNotifier {
  final List<Map<String, String>> _cartItems = [];

  List<Map<String, String>> get cartItems => List.unmodifiable(_cartItems);

  void addToCart(Map<String, String> product) {
    _cartItems.add(product);
    notifyListeners();
  }

  void removeFromCart(Map<String, String> product) {
    _cartItems.remove(product);
    notifyListeners();
  }

  void clearCart() {
    _cartItems.clear();
    notifyListeners();
  }

  double get totalPrice {
    double total = 0.0;
    for (var item in _cartItems) {
      total += double.parse(item['price']!.substring(1)); // Remove $ and parse
    }
    return total;
  }
}       //cart_model_code
