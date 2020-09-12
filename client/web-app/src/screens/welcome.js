import React from "react";
import { Container, Row, Image } from 'react-bootstrap';
import './styles/welcome.css';

class Welcome extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          url: ""
        }
    }

    handleClick() {
    this.props.history.push("/login");
  }

    render() {
        console.log(this.props.history);
        return (
          <Container className="container">
          <Row>
          <Image src={require('../assets/iiitr.png')} onClick={() => this.handleClick()} rounded className="logo" />
          </Row>
          </Container>
        );
    }
}

export default Welcome;
