import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from "axios";
import "./styles/rstop.css";

class RView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      name: "",
      form: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "1") {
      this.setState({ name: event.target.value });
    } else if (event.target.id === "2") {
      this.setState({ form: event.target.value });
    }
  }

  handleSubmit(event) {
    const data = {
      etitle: this.state.name,
      ftitle: this.state.form,
    }

    axios.post("http://localhost:3001/getform", data)
      .then(res => {
        if (res.data['success'] === "True") {
          this.props.history.push("/rform", { data: res.data });
        }
        else {
          alert("Form not Found");
          this.props.history.push("/rview");
        }
      });

    event.preventDefault();
  }

  handleBack(event) {
    this.props.history.push("/dashboard");
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid form-stop-page">
        <div className="row justify-content-center">
          <div className="card  col-11 col-sm-10 col-md-8 col-lg-5 mx-2">
            <article className="card-body ">
              <h2 className="font-weight-normal text-center">View Form</h2>
              <hr></hr>
              <Form>
                <Form.Group>
                  <Form.Row>
                    <Form.Label className="input-label">Event Name</Form.Label>
                  </Form.Row>
                  <Form.Row>
                    <Form.Control
                      id="1"
                      value={this.state.name}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Type exactly as it is"
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Row>
                    <Form.Label className="input-label">Form Name</Form.Label>
                  </Form.Row>
                  <Form.Row>
                    <Form.Control
                      id="2"
                      value={this.state.form}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Type exactly as it is"
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Row>
                    <Button className="stop-button" onClick={this.handleSubmit}>
                      View
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

export default RView;
