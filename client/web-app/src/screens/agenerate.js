import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from "axios";
import "./styles/generate.css";

class AGenerate extends React.Component {
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
   
    axios.post("https://cehg.herokuapp.com/sheet", { 'title': this.state.name} ,
      { responseType: 'arraybuffer'})
      .then(res => {
        
        if (res.data['success'] === "False") {
          alert("Could get Data");
          this.props.history.push("/agenerate");
        }
        else {
          alert("Download will start soon");
          
          const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'sheet.zip'); //any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
          this.props.history.push("/dashboard");
        }
      });

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
                Download Attendance Sheet
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
                      Download
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

export default AGenerate;
