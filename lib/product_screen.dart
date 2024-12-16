
import 'package:flutter/material.dart';
import 'package:krishihut1/cart_screen.dart';
import 'package:provider/provider.dart';
import 'cart_model.dart';

class ProductScreen extends StatelessWidget {
  final List<Map<String, String>> products = [
    {
      'name': 'Organic Fertilizer',
      'description': 'Enhance soil fertility naturally.',
      'price': '৳120',
      'image': 'assets/image11.webp'
    },
    {
      'name': 'Pesticide Spray',
      'description': 'Protect your crops from pests.',
      'price': '৳100',
      'image': 'assets/image2.jpg'
    },
    {
      'name': 'Agricultural Instruments',
      'description': 'High-quality tools for farming.',
      'price': '৳250',
      'image': 'assets/image3.webp'
    },
    {
      'name': 'Digital Instruments',
      'description': 'Modern tools for precision farming.',
      'price': '৳1000',
      'image': 'assets/image4.webp'
    },
    {
      'name': 'Fresh Vegetables',
      'description': 'Organic and fresh vegetables.',
      'price': '৳30',
      'image': 'assets/image5.jpg'
    },
    {
      'name': 'Agricultural Medicine',
      'description': 'Solutions for plant health.',
      'price': '৳125',
      'image': 'assets/image6.png'
    },
  ];

  ProductScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Products'),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => CartScreen()),
              );
            },
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.green.shade300, Colors.green.shade100],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: ListView.builder(
          itemCount: products.length,
          itemBuilder: (context, index) {
            final product = products[index];
            return Card(
              color: Colors.white70,
              elevation: 4,
              margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
              child: ListTile(
                leading: Image.asset(product['image']!, fit: BoxFit.cover),
                title: Text(
                  product['name']!,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(product['description']!),
                trailing: Text(
                  product['price']!,
                  style: const TextStyle(
                    color: Colors.green,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProductDetail(product: product),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}

class ProductDetail extends StatelessWidget {
  final Map<String, String> product;

  const ProductDetail({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(product['name']!)),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.green.shade300, Colors.green.shade100],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: Image.asset(product['image']!,
                      height: 200, width: 200, fit: BoxFit.cover),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                product['name']!,
                style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87),
              ),
              const SizedBox(height: 8),
              Text(
                product['description']!,
                style: const TextStyle(fontSize: 16, color: Colors.black54),
              ),
              const SizedBox(height: 16),
              Text(
                'Price: ${product['price']}',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                ),
              ),
              const Spacer(),
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    Provider.of<CartModel>(context, listen: false)
                        .addToCart(product);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Added to Cart')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green.shade700,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 15),
                  ),
                  child: const Text(
                    'Add to Cart',
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
