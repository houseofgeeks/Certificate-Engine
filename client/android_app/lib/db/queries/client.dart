import '../db.dart';
import '../models/client.dart';

class QClient {
  static final DBProvider dbp = DBProvider();
  static final db = dbp.database;

  Future createClient(Client client) async {
    var table = await db.rawQuery("SELECT MAX(id)+1 as id FROM Client");
    int id = table.first["id"];

    var raw = await db.rawInsert(
        "INSERT Into Client (id, name)"
        " VALUES (?,?)",
        [id, client.name]);
    return raw;
  }

  Future updateClient(Client client) async {
    var res = await db.update("Client", client.toMap(),
        where: "id = ?", whereArgs: [client.id]);
    return res;
  }

  Future deleteClient(int id) async {
    return db.delete("Client", where: "id = ?", whereArgs: [id]);
  }

  Future deleteAllClient() async {
    db.rawDelete("Delete * from Client");
  }

  Future getAllClient() async {
    var res = await db.query("Client");
    List<Client> list =
        res.isNotEmpty ? res.map((c) => Client.fromMap(c)).toList() : [];
    return list;
  }

  Future getClientById(int id) async {
    var res = await db.query("Client", where: "id = ?", whereArgs: [id]);
    return res.isNotEmpty ? Client.fromMap(res.first) : null;
  }
}
