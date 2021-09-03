import 'dart:io';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DBProvider {
  static Database _database;

  DBProvider() {
    init();
  }

  final List<String> createTables = [
    "CREATE TABLE Client ( id INTEGER PRIMARY KEY, name TEXT )"
  ];

  get database async {
    return _database;
  }

  Future init() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path =
        p.join(documentsDirectory.path, dotenv.env['APP_NAME'] + ".db");
    return await openDatabase(path, version: 1, onOpen: (db) {},
        onCreate: (Database db, int version) async {
      for (var i = 0; i < createTables.length; i++) {
        await db.execute(createTables[i]);
      }
    });
  }
}
