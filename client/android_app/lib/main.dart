import 'dart:async';
import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ChangeNotifierProvider(
        create: (context) => Store(),
        child: MaterialApp(
          theme: ThemeData.dark(),
          initialRoute: 'Account',
          routes: {
            'Account': (context) => Account(),
            'Scan': (context) => Scan()
          },
          debugShowCheckedModeBanner: false,
        )),
  );
}

class Store extends ChangeNotifier {
  String userId = "";
  String password = "";
  bool validUser = false;

  Future setAuth(String userId, String password) async {
    this.userId = userId;
    this.password = password;
    var url = 'https://codenutb.herokuapp.com/isauth';
    var response =
        await http.post(url, body: {'userid': userId, 'password': password});
    var decoded = json.decode(response.body);

    if (decoded['success'].toString().compareTo("True") == 0) {
      this.validUser = true;
    }
    notifyListeners();
  }
}

class Account extends StatelessWidget {
  final TextEditingController text = TextEditingController();
  final TextEditingController password = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Consumer<Store>(
      builder: (context, store, child) {
        return Scaffold(
            body: Padding(
                padding: EdgeInsets.all(10),
                child: ListView(
                  children: <Widget>[
                    Container(
                        alignment: Alignment.center,
                        padding: EdgeInsets.all(10),
                        child: Text(
                          'Certificate Engine',
                          style: TextStyle(fontSize: 36, color: Colors.green),
                        )),
                    Container(
                      padding: EdgeInsets.all(10),
                      child: TextFormField(
                        controller: text,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'UserId',
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                      child: TextFormField(
                        obscureText: true,
                        controller: password,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                        ),
                      ),
                    ),
                    Row(
                      children: [
                        Container(
                            height: 60,
                            width: 385,
                            padding: EdgeInsets.fromLTRB(40, 20, 40, 0),
                            child: RaisedButton(
                              textColor: Colors.white,
                              color: Colors.green,
                              child: Text('Log In'),
                              onPressed: () async {
                                await store.setAuth(text.text, password.text);
                                if (store.validUser == true) {
                                  Navigator.pushNamedAndRemoveUntil(
                                      context, "Message", (r) => false);
                                }
                              },
                            )),
                      ],
                    ),
                  ],
                )));
      },
    );
  }
}

class Scan extends StatelessWidget {
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);

  @override
  Widget build(BuildContext context) {
    return Consumer<Store>(builder: (context, store, child) {
      return Scaffold(
          body: Padding(
              padding: EdgeInsets.fromLTRB(20, 20, 20, 10),
              child: ListView(
                children: <Widget>[],
              )));
    });
  }
}
