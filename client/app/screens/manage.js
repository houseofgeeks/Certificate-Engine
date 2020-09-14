import React from "react";
import { Text, View, Button, ImageBackground} from 'react-native';
import styles from "../screens/styles/manage.js";

function changeState(i,ref)
{
  if(i == 1)
  {
    if(ref.state.x1 === 0)ref.setState({x1: 1});
    else ref.setState({x1: 0});
    if(ref.state.y1 === 0)ref.setState({y1: 1});
    else ref.setState({y1: 0});
  }
  else if(i == 0)
  {
    if(ref.state.x2 === 0)ref.setState({x2: 1});
    else ref.setState({x2: 0});
    if(ref.state.y2 === 0)ref.setState({y2: 1});
    else ref.setState({y2: 0});
  }
  else
  {
    ref.setState({flag: true});
    ref.setState({message: "Generation in progress"});
  }
}

function makecard(i,ref)
{
  if( i == 1)
  {
    const textlabels =  ["Registration Closed", "Registration Open"];
    const buttonlabels =  ["Open", "End"];
    return (
      <View style={styles.BoxU}>
        <View style={styles.Box}>
        <Text style={styles.Text}>Registration</Text>
        <Text style={styles.TextI}>{textlabels[ref.state.x1]}</Text>
        <View style={styles.Button}>
        <Button title= {buttonlabels[ref.state.y1]} onPress={async () => changeState(i,ref)}></Button>
        </View>
        </View>
      </View>
    );
  }
  else if( i == 0)
  {
    const textlabels =  ["Event Started", " Event Ended"];
    const buttonlabels =  ["End", "Start"];
    return (
      <View style={styles.BoxU}>
        <View style={styles.Box}>
        <Text style={styles.Text}>Event</Text>
        <Text style={styles.TextI}>{textlabels[ref.state.x2]}</Text>
        <View style={styles.Button}>
        <Button title= {buttonlabels[ref.state.y2]} onPress={async () => changeState(i,ref)}></Button>
        </View>
        </View>
      </View>
    );
  }
  else
  {
    return (
      <View style={styles.BoxU}>
        <View style={styles.Box}>
        <Text style={styles.Text}>Certificate</Text>
        <Text style={styles.TextI}>{ref.state.message}</Text>
        <View style={styles.Button}>
        <Button disabled={ref.state.flag} title= "Start" onPress={async () => changeState(i,ref)}></Button>
        </View>
        </View>
      </View>
    );
  }
}

class manage extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          flag: false,
          message: "Generate Certificate"
        }
    }
    render() {
        return (
            <View style={styles.Container}>
              {makecard(0,this)}
              {makecard(1,this)}
              {makecard(2,this)}
            </View>
        );
    }
}

export default manage;
