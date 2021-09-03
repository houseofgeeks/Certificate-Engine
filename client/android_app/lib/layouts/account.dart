import 'package:android_app/components/beauty_textfield.dart';
import 'package:android_app/components/frame.dart';
import 'package:android_app/store/store.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Account extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Consumer<Store>(
      builder: (context, store, child) {
        return Frame(<Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(0, height * 0.1, 0, 0),
            child: Column(
              children: <Widget>[
                BeautyTextfield(
                  width: double.maxFinite,
                  height: 60,
                  duration: Duration(milliseconds: 300),
                  inputType: TextInputType.text,
                  prefixIcon: Icon(Icons.create),
                  suffixIcon: Icon(Icons.code),
                  backgroundColor: store.theme.compareTo('dark') == 0
                      ? Color.fromARGB(0, 0, 0, 0)
                      : Color.fromARGB(0, 0, 0, 1),
                  textColor: Colors.black,
                  placeholder: "Event Name",
                  onChanged: (text) {
                    store.eventName = text;
                  },
                ),
                BeautyTextfield(
                  width: double.maxFinite,
                  height: 60,
                  duration: Duration(milliseconds: 300),
                  inputType: TextInputType.text,
                  prefixIcon: Icon(Icons.create),
                  suffixIcon: Icon(Icons.code),
                  backgroundColor: store.theme.compareTo('dark') == 0
                      ? Color.fromARGB(0, 0, 0, 0)
                      : Color.fromARGB(0, 0, 0, 1),
                  textColor: Colors.black,
                  placeholder: "UserId",
                  onChanged: (text) {
                    store.userId = text;
                  },
                ),
                BeautyTextfield(
                  width: double.maxFinite,
                  height: 60,
                  duration: Duration(milliseconds: 300),
                  inputType: TextInputType.text,
                  prefixIcon: Icon(Icons.create),
                  suffixIcon: Icon(Icons.code),
                  backgroundColor: store.theme.compareTo('dark') == 0
                      ? Color.fromARGB(0, 0, 0, 0)
                      : Color.fromARGB(0, 0, 0, 1),
                  textColor: Colors.black,
                  placeholder: "Password",
                  onChanged: (text) {
                    store.password = text;
                  },
                ),
                Container(
                  height: 50.0,
                  margin: EdgeInsets.all(10),
                  child: RaisedButton(
                    onPressed: () async {
                      if (await store.isAuth() == true) {
                        await store.setStat(true);
                        Navigator.pushNamedAndRemoveUntil(
                            context, "Home", (r) => false);
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text('Invalid Username/Password')));
                      }
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
                        constraints:
                            BoxConstraints(maxWidth: 200.0, minHeight: 50.0),
                        alignment: Alignment.center,
                        child: Text(
                          "Log In",
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.white, fontSize: 15),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
        ]);
      },
    );
  }
}
