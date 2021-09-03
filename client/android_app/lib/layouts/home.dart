import 'package:android_app/components/frame.dart';
import 'package:android_app/store/store.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Store>(
      builder: (context, store, child) {
        return Frame(<Widget>[
          Container(
              alignment: Alignment.center,
              padding: EdgeInsets.all(10),
              child: Text(store.eventName,
                  style: TextStyle(
                    fontSize: 48,
                    color: store.theme.compareTo('dark') == 0
                        ? Colors.white
                        : Colors.black,
                    shadows: [
                      Shadow(
                        color: Colors.green,
                        blurRadius: 10.0,
                        offset: Offset(3.0, 3.0),
                      ),
                    ],
                  ))),
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
                            fontSize: 24,
                            color: store.theme.compareTo('dark') == 0
                                ? Colors.white
                                : Colors.black,
                            shadows: [
                              Shadow(
                                color: Colors.green,
                                blurRadius: 10.0,
                                offset: Offset(3.0, 3.0),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(85, 0, 0, 0),
                          child: Text(
                            store.totalCount.toString(),
                            style: TextStyle(
                              fontSize: 22,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        )
                      ],
                    )),
                Container(
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                    child: Row(
                      children: [
                        Text('Present',
                            style: TextStyle(
                              fontSize: 24,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                              shadows: [
                                Shadow(
                                  color: Colors.green,
                                  blurRadius: 10.0,
                                  offset: Offset(3.0, 3.0),
                                ),
                              ],
                            )),
                        Container(
                          padding: EdgeInsets.fromLTRB(117, 0, 0, 0),
                          child: Text(
                            store.presentCount.toString(),
                            style: TextStyle(
                              fontSize: 22,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        )
                      ],
                    )),
                Container(
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                    child: Row(
                      children: [
                        Text('Absent',
                            style: TextStyle(
                              fontSize: 24,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                              shadows: [
                                Shadow(
                                  color: Colors.green,
                                  blurRadius: 10.0,
                                  offset: Offset(3.0, 3.0),
                                ),
                              ],
                            )),
                        Container(
                          padding: EdgeInsets.fromLTRB(124, 0, 0, 0),
                          child: Text(
                            store.absentCount.toString(),
                            style: TextStyle(
                              fontSize: 22,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        )
                      ],
                    )),
              ],
            )),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(0, 0, 10, 50),
            child: Card(
                child: Column(
              children: [
                Container(
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                    child: Row(
                      children: [
                        Text(
                          'Visitor Id',
                          style: TextStyle(
                            fontSize: 24,
                            color: store.theme.compareTo('dark') == 0
                                ? Colors.white
                                : Colors.black,
                            shadows: [
                              Shadow(
                                color: Colors.green,
                                blurRadius: 10.0,
                                offset: Offset(3.0, 3.0),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(100, 0, 0, 0),
                          child: Text(
                            store.sid,
                            style: TextStyle(
                              fontSize: 22,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        )
                      ],
                    )),
                Container(
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
                    child: Row(
                      children: [
                        Text('Presence',
                            style: TextStyle(
                              fontSize: 24,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                              shadows: [
                                Shadow(
                                  color: Colors.green,
                                  blurRadius: 10.0,
                                  offset: Offset(3.0, 3.0),
                                ),
                              ],
                            )),
                        Container(
                          padding: EdgeInsets.fromLTRB(100, 0, 0, 0),
                          child: Text(
                            store.presence,
                            style: TextStyle(
                              fontSize: 22,
                              color: store.theme.compareTo('dark') == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        )
                      ],
                    )),
              ],
            )),
          ),
          Container(
            height: 50.0,
            margin: EdgeInsets.all(10),
            child: RaisedButton(
              onPressed: () async {
                store.toggle();
              },
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(80.0)),
              padding: EdgeInsets.all(0.0),
              child: Ink(
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.green, Colors.greenAccent],
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                    ),
                    borderRadius: BorderRadius.circular(30.0)),
                child: Container(
                  constraints: BoxConstraints(maxWidth: 400.0, minHeight: 50.0),
                  alignment: Alignment.center,
                  child: Text(
                    store.presence.compareTo("Absent") == 0
                        ? "Mark Present"
                        : "Mark Absent",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white, fontSize: 15),
                  ),
                ),
              ),
            ),
          ),
          Container(
            height: 50.0,
            margin: EdgeInsets.all(10),
            child: RaisedButton(
              onPressed: () async {
                store.scan();
              },
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(80.0)),
              padding: EdgeInsets.all(0.0),
              child: Ink(
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.green, Colors.greenAccent],
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                    ),
                    borderRadius: BorderRadius.circular(30.0)),
                child: Container(
                  constraints: BoxConstraints(maxWidth: 400.0, minHeight: 50.0),
                  alignment: Alignment.center,
                  child: Text(
                    "Scan",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white, fontSize: 15),
                  ),
                ),
              ),
            ),
          )
        ]);
      },
    );
  }
}
