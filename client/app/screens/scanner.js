import React from 'react';
import { Text, View, Image, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button} from 'react-native-elements'
import styles from "../screens/styles/scanner.js";

class scanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      College: "",
      Year: "",
      Branch: ""
    };
  }

  barcodeRecognized = ({ barcodes }) => {
    this.setState({Name: barcodes[0]['data']});
    this.setState({College: barcodes[0]['data']});
    this.setState({Year: barcodes[0]['data']});
     this.setState({Branch: barcodes[0]['data']});
    };

  render() {
    return (
      <View style={styles.Box}>
        <ImageBackground source={require("../assets/background.jpg")} style={styles.Background}>
          <View style={styles.Container}>

            <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.Camera}
            onGoogleVisionBarcodesDetected={this.barcodeRecognized}
            captureAudio={false}
            >
            </RNCamera>
            
            <Image source={{uri: "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png"}} style={styles.Logo}/> 
          </View>
          <View style={styles.Box}>
            <Text style={styles.Text}>NAME:&nbsp;&nbsp;&nbsp;{this.state.Name}</Text>
            <Text style={styles.Text}>COLLLEGE:&nbsp;&nbsp;&nbsp;{this.state.College}</Text>
            <Text style={styles.Text}>YEAR:&nbsp;&nbsp;&nbsp;{this.state.Year}</Text>
            <Text style={styles.Text}>BRANCH:&nbsp;&nbsp;&nbsp;{this.state.Branch}</Text>
          </View>
          <View style={styles.Button}>
            <Button title= {"Mark Present"} type="outline" onClick = {() => {
            }}/>
            </View>
            <View style={styles.Button}>
              <Button title= {"Manage"} type="outline" onPress={() =>{
                this.props.navigation.navigate('manage',{})}}/>
            </View>
         </ImageBackground>
      </View>
    );
  }
}

export default scanner
