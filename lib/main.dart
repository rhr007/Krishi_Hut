import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'cart_model.dart';
import 'product_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => CartModel(), // Initialize the cart model
      child: const KrishihutApp(),
    ),
  );
}

class KrishihutApp extends StatelessWidget {
  const KrishihutApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Krishihut1',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const HomeScreen(), // Set HomeScreen as the starting screen
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Krishihut1'),
      ),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.green.shade100, Colors.lightBlue.shade100],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Welcome to Krishihut',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.green.shade900,
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ProductScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                backgroundColor: Colors.green,
              ),
              child: const Text(
                'Show Products',
                style: TextStyle(fontSize: 18),
              ),
            ),
          ],
        ),
      ),
    );
  }
} // End of Code
