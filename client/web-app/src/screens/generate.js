import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from "axios";
import "./styles/generate.css";

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    //console.log(this.state);

    /*const data = {
        name: this.state.name,
      }

      axios.post("",{data})
      .then(res => {
        this.setState({valid: res.valid});
      });*/

    if (this.state.valid === true) {
      alert("Certificate Generation Started Succesfully");
      this.props.history.push("/dashboard");
    } else {
      alert("Could Start Certificate Generation");
      this.props.history.push("/estop");
    }
    event.preventDefault();
  }

  handleBack(event) {
    console.log(this.state);
    this.props.history.push("/dashboard");
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid generate-page">
        <div className="row justify-content-center">
          <div className="card  col-11 col-sm-10 col-md-8 col-lg-4 mx-2">
            <article className="card-body ">
              <h2 className="font-weight-normal text-center">
                Generate Certificate
              </h2>
              <hr></hr>
              <br></br>
              <Form>
                <Form.Group>
                  <Form.Row>
                    <Form.Label className="event-name-label">
                      Event Name :
                    </Form.Label>
                  </Form.Row>
                  <Form.Row>
                    <Form.Control
                      className="event-name-input"
                      value={this.state.name}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Type exactly as it is"
                    />
                  </Form.Row>
                </Form.Group>

                <Form.Group>
                  <Form.Row>
                    <Button
                      className="generate-button"
                      onClick={this.handleSubmit}
                    >
                      Generate
                    </Button>
                  </Form.Row>
                </Form.Group>

                <Form.Group>
                  <Form.Row>
                    <Button
                      className="dashboard-button"
                      onClick={this.handleBack}
                    >
                      Dashboard
                    </Button>
                  </Form.Row>
                </Form.Group>
              </Form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Generate;
