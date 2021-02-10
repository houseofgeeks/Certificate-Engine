import 'dart:async';
import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:qrscan/qrscan.dart' as scanner;

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

  String id = "Scan and Toggle";
  String event = "";
  String presence = "Absent";

  int pcount = 0;
  int acount = 0;
  int tcount = 0;

  Future setAuth(String userId, String password) async {
    this.userId = userId;
    this.password = password;
    var url = 'https://cehg.herokuapp.com/isauth';
    var response =
        await http.post(url, body: {'userid': userId, 'password': password});
    var decoded = json.decode(response.body);

    if (decoded['success'].toString().compareTo("True") == 0) {
      this.validUser = true;
    }
    notifyListeners();
  }

  Future scan() async {
    String cameraScanResult = await scanner.scan();
    var decoded = json.decode(cameraScanResult);
    this.id = decoded['id'];

    if (decoded['presence'].compareTo("0") == 0) {
      this.presence = "Absent";
    } else {
      this.presence = "Present";
    }

    notifyListeners();
  }

  Future toggle() async {
    var url = "";
    if (this.presence.compareTo("Absent") == 0) {
      url = 'https://cehg.herokuapp.com/marksheet';
    } else {
      url = 'https://cehg.herokuapp.com/unmarksheet';
    }

    var response =
        await http.post(url, body: {'title': this.event, 'id': this.id});
    var decoded = json.decode(response.body);
    notifyListeners();
  }

  Future getstat() async {
    var url = 'https://cehg.herokuapp.com/getsheet';
    print(this.event);
    var response = await http.post(url, body: {'title': this.event});
    var decoded = json.decode(response.body);

    this.pcount = 0;
    this.acount = 0;
    this.tcount = 0;

    if (decoded['success'].compareTo("True") == 0) {
      print(decoded['data']['data']);
      for (int i = 1; i < decoded['data']['data'].length; i++) {
        if (decoded['data']['data'][i]['id'].compareTo(this.id) == 0) {
          if (decoded['data']['data'][i]['presence'].compareTo("0") == 0) {
            this.presence = "Absent";
          } else {
            this.presence = "Present";
          }
        }
        if (decoded['data']['data'][i]['presence'].compareTo("0") == 0) {
          this.acount++;
        } else {
          this.pcount++;
        }
        this.tcount++;
      }
    }

    notifyListeners();
  }
}

class Account extends StatelessWidget {
  final TextEditingController text = TextEditingController();
  final TextEditingController password = TextEditingController();
  final TextEditingController event = TextEditingController();
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
                        padding: EdgeInsets.all(22),
                        child: Text(
                          'Certificate Engine',
                          style: TextStyle(fontSize: 44, color: Colors.green),
                        )),
                    Container(
                      padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                      child: TextFormField(
                        controller: event,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Event Name',
                        ),
                      ),
                    ),
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
                                store.event = event.text;
                                await store.setAuth(text.text, password.text);
                                if (store.validUser == true) {
                                  await store.getstat();
                                  Navigator.pushNamedAndRemoveUntil(
                                      context, "Scan", (r) => false);
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
                children: <Widget>[
                  Container(
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(10),
                      child: Text(
                        'Attendance',
                        style: TextStyle(fontSize: 48, color: Colors.green),
                      )),
                  Container(
                    padding: EdgeInsets.fromLTRB(0, 50, 10, 50),
                    child: Card(
                        child: Column(
                      children: [
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                            child: Row(
                              children: [
                                Text(
                                  'Registered',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(85, 0, 0, 0),
                                  child: Text(
                                    store.tcount.toString(),
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                            child: Row(
                              children: [
                                Text(
                                  'Present',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(117, 0, 0, 0),
                                  child: Text(
                                    store.pcount.toString(),
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                            child: Row(
                              children: [
                                Text(
                                  'Absent',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(124, 0, 0, 0),
                                  child: Text(
                                    store.acount.toString(),
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                      ],
                    )),
                  ),
                  Container(
                    padding: EdgeInsets.fromLTRB(0, 0, 10, 30),
                    child: Card(
                        child: Column(
                      children: [
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                            child: Row(
                              children: [
                                Text(
                                  'Event Name',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(65, 0, 0, 0),
                                  width: 200,
                                  child: Text(
                                    store.event,
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                            child: Row(
                              children: [
                                Text(
                                  'Identifier',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(100, 0, 0, 0),
                                  width: 235,
                                  child: Text(
                                    store.id,
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                        Container(
                            alignment: Alignment.centerLeft,
                            padding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                            child: Row(
                              children: [
                                Text(
                                  'Presence',
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.green),
                                ),
                                Container(
                                  padding: EdgeInsets.fromLTRB(92, 0, 0, 0),
                                  child: Text(
                                    store.presence,
                                    style: TextStyle(
                                        fontSize: 22, color: Colors.white),
                                  ),
                                )
                              ],
                            )),
                      ],
                    )),
                  ),
                  Row(
                    children: [
                      Container(
                          height: 60,
                          width: 370,
                          padding: EdgeInsets.fromLTRB(40, 20, 50, 0),
                          child: RaisedButton(
                            textColor: Colors.white,
                            color: Colors.green,
                            child: Text('Scan'),
                            onPressed: () async {
                              await store.scan();
                            },
                          )),
                    ],
                  ),
                  Row(
                    children: [
                      Container(
                          height: 60,
                          width: 370,
                          padding: EdgeInsets.fromLTRB(40, 20, 50, 0),
                          child: RaisedButton(
                            textColor: Colors.white,
                            color: Colors.green,
                            child: Text('Toggle Presence'),
                            onPressed: () async {
                              await store.toggle();
                              await store.getstat();
                            },
                          )),
                    ],
                  ),
                ],
              )));
    });
  }
}
