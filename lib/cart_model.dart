

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
