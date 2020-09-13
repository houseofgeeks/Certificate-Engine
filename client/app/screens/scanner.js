import React from 'react';
import { Text, View, Image, ImageBackground, Button} from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from "../screens/styles/scanner.js";

class scanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      title: "Not Ready",
      data: ""
    };
  }

  barcodeRecognized = ({ barcodes }) => {
     if(barcodes[0]['type'] === "UNKNOWN_FORMAT")
     {
       this.setState({flag: true});
       this.setState({title: "Not Ready"});
     }
     else
     {
       this.setState({flag: false});
       this.setState({title: "View Details"});
       this.setState({data: barcodes[0]['data']});
     }
    };

  render() {
    return (
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
      <View style={styles.Button}>
      <Button title={this.state.title} disabled= {this.state.flag} onPress= {() => {
        this.setState({flag: true});
        this.setState({title: "Not Ready"});
        this.props.navigation.navigate('details',{data: this.state.data});
      }}></Button>
      </View>
      </View>
    );
  }
}

export default scanner
