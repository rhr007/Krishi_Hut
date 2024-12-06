// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'cart_model.dart';
// import 'product_screen.dart';

// void main() {
//   runApp(
//     ChangeNotifierProvider(
//       create: (_) => CartModel(), // Initialize the cart model
//       child: const KrishihutApp(),
//     ),
//   );
// }

// class KrishihutApp extends StatelessWidget {
//   const KrishihutApp({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Krishihut1',
//       theme: ThemeData(
//         primarySwatch: Colors.green,
//       ),
//       home: const HomeScreen(), // Set HomeScreen as the starting screen
//     );
//   }
// }

// class HomeScreen extends StatelessWidget {
//   const HomeScreen({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Krishihut1'),
//       ),
//       body: Container(
//         padding: const EdgeInsets.all(16.0),
//         decoration: BoxDecoration(
//           gradient: LinearGradient(
//             colors: [Colors.green.shade100, Colors.lightBlue.shade100],
//             begin: Alignment.topCenter,
//             end: Alignment.bottomCenter,
//           ),
//         ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             Text(
//               'Welcome to Krishihut',
//               textAlign: TextAlign.center,
//               style: TextStyle(
//                 fontSize: 28,
//                 fontWeight: FontWeight.bold,
//                 color: Colors.green.shade900,
//               ),
//             ),
//             const SizedBox(height: 20),
//             ElevatedButton(
//               onPressed: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(builder: (context) => ProductScreen()),
//                 );
//               },
//               style: ElevatedButton.styleFrom(
//                 padding:
//                     const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
//                 backgroundColor: Colors.green,
//               ),
//               child: const Text(
//                 'Show Products',
//                 style: TextStyle(fontSize: 18),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// } // End of Code

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

            // Navigate to Product Screen
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
            const SizedBox(height: 20),

            // Navigate to Login Screen
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => LoginScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                backgroundColor: Colors.blue,
              ),
              child: const Text(
                'Log In',
                style: TextStyle(fontSize: 18),
              ),
            ),
            const SizedBox(height: 20),

            // Navigate to Sign-Up Screen
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SignupScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                backgroundColor: Colors.orange,
              ),
              child: const Text(
                'Sign Up',
                style: TextStyle(fontSize: 18),
              ),
            ),
          ],
        ),
      ),
    );
  }
}



// import 'package:flutter/material.dart';
// import 'package:krishihut1/auth_provider.dart';
// import 'package:provider/provider.dart';
// import 'cart_model.dart';
// import 'product_screen.dart';
// import 'login_screen.dart';
// // ignore: unused_import
// import 'signup_screen.dart';

// void main() {
//   runApp(
//     MultiProvider(
//       providers: [
//         ChangeNotifierProvider(create: (_) => CartModel()),
//         ChangeNotifierProvider(create: (_) => AuthProvider()), // Login state
//       ],
//       child: const KrishihutApp(),
//     ),
//   );
// }

// class KrishihutApp extends StatelessWidget {
//   const KrishihutApp({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Krishihut1',
//       theme: ThemeData(
//         primarySwatch: Colors.green,
//       ),
//       home: Consumer<AuthProvider>(
//         builder: (context, authProvider, _) {
//           return authProvider.isLoggedIn
//               ? const HomeScreen() // If logged in, show HomeScreen
//               :  LoginScreen(); // Otherwise, show LoginScreen
//         },
//       ),
//     );
//   }
// }

// class HomeScreen extends StatelessWidget {
//   const HomeScreen({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Krishihut1'),
//         actions: [
//           IconButton(
//             icon: const Icon(Icons.logout),
//             onPressed: () {
//               // Logout and return to login screen
//               Provider.of<AuthProvider>(context, listen: false).logout();
//             },
//           ),
//         ],
//       ),
//       body: Container(
//         padding: const EdgeInsets.all(16.0),
//         decoration: BoxDecoration(
//           gradient: LinearGradient(
//             colors: [Colors.green.shade100, Colors.lightBlue.shade100],
//             begin: Alignment.topCenter,
//             end: Alignment.bottomCenter,
//           ),
//         ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             Text(
//               'Welcome to Krishihut',
//               textAlign: TextAlign.center,
//               style: TextStyle(
//                 fontSize: 28,
//                 fontWeight: FontWeight.bold,
//                 color: Colors.green.shade900,
//               ),
//             ),
//             const SizedBox(height: 20),

//             // Show Products Button (only if logged in)
//             ElevatedButton(
//               onPressed: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(builder: (context) => ProductScreen()),
//                 );
//               },
//               style: ElevatedButton.styleFrom(
//                 padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
//                 backgroundColor: Colors.green,
//               ),
//               child: const Text(
//                 'View Products',
//                 style: TextStyle(fontSize: 18),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

