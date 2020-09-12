import React from "react";
import { Row, Jumbotron, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css';

class Dashboard extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          data: ""
        }
        this.handleEventStart = this.handleEventStart.bind(this);
        this.handleEventStop = this.handleEventStop.bind(this);
        this.handleRegistrationStart = this.handleRegistrationStart.bind(this);
        this.handleRegistrationStop = this.handleRegistrationStop.bind(this);
        this.handleGeneration = this.handleGeneration.bind(this);
    }

    handleEventStart(event) {
       console.log("Event Started");
       this.props.history.push("/ecreation");
    }

    handleEventStop(event) {
       console.log("Event Stopped");
       this.props.history.push("/estop");
    }

    handleRegistrationStart(event) {
      console.log("Registration Started");
      this.props.history.push("/rcreation");
    }

    handleRegistrationStop(event) {
       console.log("Registration Stopped");
       this.props.history.push("/rstop");
    }

    handleGeneration(event) {
      console.log("Generation Started");
      this.props.history.push("/generate");
    }

    render() {
        return (
          <span className="container py-5 align-items-center">
          <Row className="container mx-5 my-5 align-items-center border border-3 border-success bg-dark">
          <Row className="mx-3 mb-5">
          <Jumbotron className="bg-success text-center text-dark">
          <span className="card-title h2">Event</span>
          <p className="text-light"> Start managing your House of Geeks events now.</p>
          <Button variant="danger" className="mx-2 my-1" onClick={this.handleEventStart}>Create</Button>
          <Button variant="danger" className="mx-2 my-1" onClick={this.handleEventStop}>Stop</Button>
          </Jumbotron>
          </Row>
          <Row className="mx-3 mb-5">
          <Jumbotron className="bg-success text-center text-dark">
          <span className="card-title h2">Forms</span>
          <p className="text-light"> Start managing your House of Geeks forms now.</p>
          <Button variant="danger" className="mx-2 my-1" onClick={this.handleRegistrationStart}>Create</Button>
          <Button variant="danger" className="mx-2 my-1" onClick={this.handleRegistrationStop}>Stop</Button>
          </Jumbotron>
          </Row>
          <Row className="mx-3 mb-5">
          <Jumbotron  className="bg-success text-center text-dark">
          <span className="card-title h2">Certificate</span>
          <p className="text-light"> Start create your House of Geeks certifcate now.</p>
          <Button variant="danger" className="mx-2 my-1" onClick={this.handleGeneration}>Generate</Button>
          </Jumbotron>
          </Row>
          </Row>
          </span>
        );
    }
}

export default Dashboard;
