import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'cart_model.dart';
import 'product_screen.dart';
import 'login_screen.dart'; // Import the login screen
import 'signup_screen.dart';

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
        backgroundColor: Colors.green.shade400, // Green app bar color
      ),
      backgroundColor: Colors.white, // Full-screen background color (white)
      body: Container(
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.green.shade100, Colors.lightBlue.shade100],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Center(  // Center all the content vertically and horizontally
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,  // Center the column items
            crossAxisAlignment: CrossAxisAlignment.center,  // Center the items horizontally
            children: [
              Text(
                'Welcome to Krishihut',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 30,  // Increased font size for professionalism
                  fontWeight: FontWeight.bold,
                  color: Colors.green.shade900,  // Dark green color for contrast
                ),
              ),
              const SizedBox(height: 40),  // Increased space between text and buttons

              // Show Products Button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => ProductScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                  backgroundColor: Colors.green.shade600,  // Darker green for contrast
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),  // Rounded corners for a professional look
                  ),
                  elevation: 5,  // Adds a shadow for depth
                ),
                child: const Text(
                  'Show Products',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 20),

              // Log In Button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                  backgroundColor: Colors.blue.shade600,  // Blue for contrast
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  elevation: 5,
                ),
                child: const Text(
                  'Log In',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 20),

              // Sign Up Button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => SignupScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                  backgroundColor: Colors.orange.shade600,  // Orange for a fresh, energetic look
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  elevation: 5,
                ),
                child: const Text(
                  'Sign Up',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
