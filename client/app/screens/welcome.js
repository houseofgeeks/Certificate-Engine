import React from "react";
import {View, Image, Button} from 'react-native';
import styles from "../screens/styles/welcome.js";

class welcome extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.Container}>
            <Image source={require("../assets/logos/iiitr.png")} style={styles.Logo}/>
            <View style={styles.Button}>
            <Button title="Attendence" onPress = {() => this.props.navigation.navigate('scanner',{})}></Button>
            </View>
            <View style={styles.Button}>
            <Button title="Manage" onPress = {() => this.props.navigation.navigate('manage',{})}></Button>
            </View>
            </View>
        );
    }
}

export default welcome;
