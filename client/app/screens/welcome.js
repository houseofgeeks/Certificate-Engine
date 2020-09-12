import React from "react";
import {View, TouchableOpacity, Image , ImageBackground} from 'react-native';
import styles from "../screens/styles/welcome.js";

class welcome extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.Container}>
                <ImageBackground source={require("../assets/background.jpg")} style={styles.Background}>
                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('scanner',{})}}>
                        <Image source={require("../assets/logos/iiitr.png")} style={styles.Logo1}/>
                        <Image source={require("../assets/logos/hog.png")} style={styles.Logo2}/>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

export default welcome;
