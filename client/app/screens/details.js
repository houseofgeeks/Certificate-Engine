import React from "react";
import { Text, View, Image, Button} from 'react-native';
import styles from "../screens/styles/details.js";

class details extends React.Component
{
    constructor(props){
        super(props);
        const { data } = this.props.route.params;
        this.state = {
          url: "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          name: data,
          college: data,
          year: data,
          branch: data,
          flag: false,
          status: "Mark Present"
        }
    }

    render() {
        return (
          <View style={styles.Container}>
          <Image source={{uri: this.state.url}} style={styles.Photo}/>
          <View style={styles.Container}>
            <Text style={styles.Text}>NAME</Text>
            <Text style={styles.TextI}>{this.state.name}</Text>
            <Text style={styles.Text}>COLLLEGE</Text>
            <Text style={styles.TextI}>{this.state.college}</Text>
            <Text style={styles.Text}>YEAR</Text>
            <Text style={styles.TextI}>{this.state.year}</Text>
            <Text style={styles.Text}>BRANCH</Text>
            <Text style={styles.TextI}>{this.state.branch}</Text>
          </View>
          <View style={styles.Button}>
          <Button disable={this.state.flag} title={this.state.status} onPress={() => {
            this.setState({flag: true});
            this.setState({status: "Marked"});
          }}></Button>
          </View>
          </View>
        );
    }
}

export default details;
