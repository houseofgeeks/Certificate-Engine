import React from 'react';
import { Text, View, Image, ImageBackground, Button} from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from "../screens/styles/scanner.js";

async function change(ref)
{
  await ref.setState({flag: true});
  await ref.setState({title: "Not Ready"});
}

class scanner extends React.Component {
  constructor(props) {
    super(props);
    const { eventName } = this.props.route.params;
    this.state = {
      flag: true,
      title: "Not Ready",
      data: "",
      eventName: eventName
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
    console.log(this.state.eventName);
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
        change(this);
        this.props.navigation.navigate('details',{data: this.state.data, eventName:this.state.eventName});
      }}></Button>
      </View>
      </View>
    );
  }
}

export default scanner
