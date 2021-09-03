import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class Services {
  Future isAuth(String userId, String password) async {
    var url = Uri.https(dotenv.env['SERVER'], '/isauth');
    var response =
        await http.post(url, body: {'userid': userId, 'password': password});
    print(response.body);
    var decoded = json.decode(response.body);

    if (decoded['success'].toString().compareTo("True") == 0) {
      return true;
    } else {
      return false;
    }
  }

  Future toggle(String event, String id, String presence) async {
    var section = "";
    if (presence.compareTo("Absent") == 0) {
      section = '/marksheet';
    } else {
      section = '/unmarksheet';
    }

    var uri = Uri.https(dotenv.env['SERVER'], section);
    var response = await http.post(uri, body: {'title': event, 'id': id});
    var decoded = json.decode(response.body);
    print(decoded);
  }

  Future getStat(String event) async {
    var uri = Uri.https(dotenv.env['SERVER'], "/getsheet");
    var response = await http.post(uri, body: {'title': event});
    var decoded = json.decode(response.body);

    Map<String, String> sheet = new Map();
    Map<String, dynamic> result = new Map();

    result['total'] = 0;
    result['absent'] = 0;
    result['present'] = 0;
    result['sheet'] = sheet;

    if (decoded['success'].compareTo("True") == 0) {
      print(decoded['data']['data']);
      for (int i = 1; i < decoded['data']['data'].length; i++) {
        sheet[decoded['data']['data'][i]['id']] =
            decoded['data']['data'][i]['presence'];

        if (decoded['data']['data'][i]['presence'].compareTo("0") == 0) {
          result['present']++;
        }
      }
      result['total'] = decoded['data']['data'].length;
      result['absent'] = result['total'] - result['present'];
      result['sheet'] = sheet;
    }
    print(result);
    return result;
  }
}
