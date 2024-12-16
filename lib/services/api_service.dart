import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://127.0.0.1:8000';

  // Register User
  Future<bool> registerUser(String firstName, String lastName, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/register/'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
      }),
    );
    return response.statusCode == 200;
  }

  // Login User
  Future<String?> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login/'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body)['access_token'];
    }
    return null;
  }

  // Fetch Products
  Future<List<dynamic>> fetchProducts() async {
    final response = await http.get(Uri.parse('$baseUrl/products/'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    return [];
  }
}
