import React from "react";
import { Text, View, Image, Button} from 'react-native';
import styles from "../screens/styles/details.js";

class details extends React.Component
{
    constructor(props){
        super(props);
        const { data } = this.props.route.params;
        const { eventName } = this.props.route.params;
        this.state = {
          url: "https://img.icons8.com/clouds/2x/no-image.png",
          name: data,
          college: data,
          year: data,
          branch: data,
          flag: false,
          status: "Mark Present",
          eventName: eventName
        }
    }

    render() {
        console.log(this.state.eventName);
        return (
          <View style={styles.Container}>
          <Image source={{uri: this.state.url}} style={styles.Photo}/>
          <View style={styles.Container}>
            <View  style={styles.Gap}>
            <View  style={styles.BoxU}>
            <View style={styles.Box}>
            <Text style={styles.Text}>NAME</Text>
            <Text style={styles.TextI}>{this.state.name}</Text>
            </View>
            </View>
            </View>
            <View  style={styles.Gap}>
            <View  style={styles.BoxU}>
            <View style={styles.Box}>
            <Text style={styles.Text}>COLLLEGE</Text>
            <Text style={styles.TextI}>{this.state.college}</Text>
            </View>
            </View>
            </View>
            <View  style={styles.Gap}>
            <View  style={styles.BoxU}>
            <View style={styles.Box}>
            <Text style={styles.Text}>YEAR</Text>
            <Text style={styles.TextI}>{this.state.year}</Text>
            </View>
            </View>
            </View>
            <View  style={styles.BoxU}>
            <View style={styles.Box}>
            <Text style={styles.Text}>BRANCH</Text>
            <Text style={styles.TextI}>{this.state.branch}</Text>
            </View>
            </View>
          </View>
          <View style={styles.Button}>
          <Button disabled={this.state.flag} title={this.state.status} onPress={() => {
            this.setState({flag: true});
            this.setState({status: "Marked"});
          }}></Button>
          </View>
          </View>
        );
    }
}

export default details;
