import React from "react";
import {View, Image, Button, TextInput} from 'react-native';
import styles from "../screens/styles/welcome.js";

class welcome extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          eventName: ""
        }
    }

    handleEvent = (text) => {
      this.setState({ eventName: text });
    }

    render() {
        return (
            <View style={styles.Container}>
            <Image source={require("../assets/logos/iiitr.png")} style={styles.Logo}/>
            <View>
            <TextInput style = {styles.Input}
               underlineColorAndroid = "transparent"
               placeholder = "Event Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleEvent}/>
            </View>
            <View style={styles.Button}>
            <Button title="Attendence" onPress = {() => this.props.navigation.navigate('scanner',{eventName:this.state.eventName})}></Button>
            </View>
            <View style={styles.Button}>
            <Button title="Manage" onPress = {() => this.props.navigation.navigate('manage',{eventName:this.state.eventName})}></Button>
            </View>
            </View>
        );
    }
}

export default welcome;
