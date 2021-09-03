import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Store {
  final keyPrefix = dotenv.env['APP_NAME'] + "_";

  Future setKey(String key, String value) async {
    var prefs = await SharedPreferences.getInstance();
    return prefs.setString(keyPrefix + key, value);
  }

  Future getKey(String key, String value) async {
    var prefs = await SharedPreferences.getInstance();
    return prefs.getString(keyPrefix + key);
  }

  Future removeKey(String key, String value) async {
    var prefs = await SharedPreferences.getInstance();
    return prefs.remove(keyPrefix + key);
  }
}
