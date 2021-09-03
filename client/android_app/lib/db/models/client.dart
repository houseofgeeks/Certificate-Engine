import 'dart:convert';

Client clientFromJson(String str) {
  final jsonData = json.decode(str);
  return Client.fromMap(jsonData);
}

String clientToJson(Client data) {
  final dyn = data.toMap();
  return json.encode(dyn);
}

class Client {
  int id;
  String name;

  Client({
    this.id,
    this.name,
  });

  factory Client.fromMap(Map<String, dynamic> json) => new Client(
        id: json["id"],
        name: json["first_name"],
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "name": name,
      };
}
