import 'package:android_app/store/store.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Frame extends StatelessWidget {
  final List<Widget> childComponent;
  Frame(this.childComponent);

  @override
  Widget build(BuildContext context) {
    return Consumer<Store>(
      builder: (context, store, child) {
        //double width = MediaQuery.of(context).size.width;
        //double height = MediaQuery.of(context).size.height;

        return Scaffold(
          appBar: AppBar(
            title: Text("CE-Scanner"),
            actions: <Widget>[
              IconButton(
                icon: const Icon(Icons.lightbulb),
                tooltip: 'Change Theme',
                onPressed: () {
                  store.toggleTheme(context);
                },
              ),
            ],
          ),
          body: ListView(
            padding: EdgeInsets.fromLTRB(16, 16, 16, 16),
            children: <Widget>[
              Container(
                  alignment: Alignment.center,
                  child: Column(children: childComponent))
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.home),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.logout),
                label: 'Logout',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.exit_to_app),
                label: 'Exit',
              ),
            ],
            currentIndex: store.selectedIndex,
            onTap: (index) => {store.navigate(index, context)},
          ),
        );
      },
    );
  }
}
