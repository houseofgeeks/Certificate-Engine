import 'dart:convert';

import 'package:android_app/services/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_qr_reader/flutter_qr_reader.dart';
import 'package:image_picker/image_picker.dart';

class Store extends ChangeNotifier {
  final Services scv = Services();

  String theme = 'dark';
  int selectedIndex = 0;

  String userId = "";
  String password = "";
  bool authenticated = false;

  String id = "0";
  String sid = "0";
  String eventName = "Event Name";
  String presence = "Absent";

  int presentCount = 0;
  int absentCount = 0;
  int totalCount = 0;

  Map<String, dynamic> sheet = new Map();

  void toggleTheme(context) {
    if (this.theme.compareTo('dark') == 0) {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
    ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Theme Changed to ' + this.theme)));
    notifyListeners();
  }

  void navigate(int data, BuildContext context) async {
    switch (data) {
      case 0:
        notifyListeners();
        Navigator.pushNamedAndRemoveUntil(context, "Home", (r) => false);
        break;
      case 1:
        notifyListeners();
        Navigator.pushNamedAndRemoveUntil(context, "Account", (r) => false);
        break;
      case 2:
        SystemNavigator.pop();
        break;
    }
    this.selectedIndex = data;
  }

  Future isAuth() async {
    if (await scv.isAuth(this.userId, this.password) == true) {
      this.authenticated = true;
      return true;
    } else {
      return false;
    }
  }

  Future setStat(bool flag) async {
    var result = await scv.getStat(this.eventName);
    this.sheet = result['sheet'];
    this.totalCount = result['total'];
    this.absentCount = result['absent'];
    this.presentCount = result['present'];

    if (flag == true) {
      this.presence = "Absent";
    } else {
      this.presence = this.sheet[id].compareTo("0") == 0 ? "Absent" : "Present";
    }
    notifyListeners();
  }

  Future scan() async {
    var image = await ImagePicker().pickImage(source: ImageSource.camera);
    if (image == null) return;
    String cameraScanResult = await FlutterQrReader.imgScan(image.path);
    var decoded = json.decode(cameraScanResult);
    int stop = decoded['_id'].length;
    int start = stop - 6;
    this.sid = decoded['_id'].substring(start, stop);
    this.id = decoded['id'];
    await setStat(false);
  }

  Future toggle() async {
    await scv.toggle(this.eventName, this.id, this.presence);
    await setStat(false);
  }
}
