import React from "react";
import { Text, View, ImageBackground} from 'react-native';
import { Card, Icon, Button} from 'react-native-elements'
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
  else
  {
    if(ref.state.x2 === 0)ref.setState({x2: 1});
    else ref.setState({y2: 0});
    if(ref.state.y2 === 0)ref.setState({y2: 1});
    else ref.setState({y2: 0});
  }
}

function makecard(i,ref)
{
  if( i == 1)
  {
    const textlabels =  ["Registration Closed", "Registration Open"];
    const buttonlabels =  ["Open", "End"];
    return (
      <Card containerStyle={styles.Card}>
         <Card.Title>Registration</Card.Title>
         <Text style={styles.CardText}>{textlabels[ref.state.x1]}</Text>
         <Button title= {buttonlabels[ref.state.y1]} type="outline" onPress = { async () => changeState(i,ref)}/>
      </Card>
    );
  }
  else
  {
    const textlabels =  ["Event Started", " Event Ended"];
    const buttonlabels =  ["End", "Start"];
    return (
      <Card containerStyle={styles.Card}>
        <Card.Title>Event</Card.Title>
        <Text style={styles.CardText}>{textlabels[ref.state.x2]}</Text>
        <Button title= {buttonlabels[ref.state.y2]} type="outline" onPress = { async () => changeState(i,ref)}/>
      </Card>
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
        }
    }
    render() {
        return (
            <View style={styles.Container}>
              <ImageBackground source={require("../assets/background.jpg")} style={styles.Background}>
                {makecard(0,this)}
                {makecard(1,this)}
              </ImageBackground>
            </View>
        );
    }
}

export default manage;
