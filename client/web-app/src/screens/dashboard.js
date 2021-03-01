import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
    this.handleEventStart = this.handleEventStart.bind(this);
    this.handleEventStop = this.handleEventStop.bind(this);
    this.handleEventView = this.handleEventView.bind(this);
    this.handleRegistrationStart = this.handleRegistrationStart.bind(this);
    this.handleRegistrationStop = this.handleRegistrationStop.bind(this);
    this.handleRegistrationView = this.handleRegistrationView.bind(this);
    this.handleAttendanceView = this.handleAttendanceView.bind(this);
    this.handleDataGeneration = this.handleDataGeneration.bind(this);
    this.handleCertificateGeneration = this.handleCertificateGeneration.bind(this);
  }

  handleEventStart(event) {
    console.log("Event Started");
    this.props.history.push("/ecreation");
  }

  handleEventStop(event) {
    console.log("Event Stopped");
    this.props.history.push("/estop");
  }

  handleEventView(event) {
    console.log("Event Stopped");
    this.props.history.push("/eview");
  }


  handleRegistrationStart(event) {
    console.log("Registration Started");
    this.props.history.push("/rcreation");
  }

  handleRegistrationStop(event) {
    console.log("Registration Stopped");
    this.props.history.push("/rstop");
  }

  handleRegistrationView(event) {
    console.log("Registration Stopped");
    this.props.history.push("/rview");
  }

  handleAttendanceView(event) {
    console.log("Generation Started");
    this.props.history.push("/agenerate");
  }

  handleDataGeneration(event) {
    console.log("Generation Started");
    this.props.history.push("/dgenerate");
  }

  handleCertificateGeneration(event) {
    console.log("Generation Started");
    this.props.history.push("/cgenerate");
  }


  render() {
    return (
      <div className="container-fluid dashboard-page py-5 align-items-center">
        <h1 className="text-center text-white">Dashboard</h1>
        <hr></hr>
        <div className="row mt-5 justify-content-center">
          <div className="col-12 col-lg-4 col-md-6 box">
            <Jumbotron className="bg text-center text-dark my-auto">
              <span className="card-title h2">Event</span>
              <hr></hr>
              <p> Start managing your House of Geeks events now.</p>
              <Button className="button" onClick={this.handleEventStart}>
                Create
              </Button>
              <Button className="button" onClick={this.handleEventView}>
                View
              </Button>
              <Button className="button" onClick={this.handleEventStop}>
                Stop
              </Button>
            </Jumbotron>
          </div>
          <div className="col-12 col-lg-4 col-md-6 box">
            <Jumbotron className="bg text-center text-dark">
              <span className="card-title h2">Forms</span>
              <hr></hr>
              <p> Start managing your House of Geeks forms now.</p>
              <Button className="button" onClick={this.handleRegistrationStart}>
                Create
              </Button>
              <Button className="button" onClick={this.handleRegistrationView}>
                View
              </Button>
              <Button className="button" onClick={this.handleRegistrationStop}>
                Stop
              </Button>
            </Jumbotron>
          </div>
          <div className="col-12 col-lg-4 col-md-6 box">
            <Jumbotron className="bg text-center text-dark">
              <span className="card-title h2">Certificate</span>
              <hr></hr>
              <p> Start create your House of Geeks certifcate now.</p>
              <Button className="button" onClick={this.handleAttendanceView}>
                Attendance QR-Codes
              </Button>
              <Button className="button" onClick={this.handleDataGeneration}>
                Form Data
              </Button>
              <Button className="button" onClick={this.handleCertificateGeneration}>
                Certificate
              </Button>
            </Jumbotron>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
