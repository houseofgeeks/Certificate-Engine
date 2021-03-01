import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from "axios";
import "./styles/generate.css";

class CGenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      name: "",
      type: "",
      label: "CSV Data",
      browse: "",
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {   
    switch(event.target.id){
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "type":
        this.setState({ type: event.target.value });
        break;
      case "csv":
        this.setState({ file: event.target.files[0] });
        this.setState({ browse: event.target.files[0].name }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
        break
    }
  }

  handleSubmit(event) {

    var data = new FormData();

    data.append("title", this.state.name);
    data.append("type", this.state.type);
    data.append("files", this.state.file);

    

    axios.post("https://cehg.herokuapp.com/certificate", data,
      { responseType: 'arraybuffer' })
      .then(res => {

        if (res.data['success'] === "False") {
          alert("Could get Data");
          this.props.history.push("/cgenerate");
        }
        else {
          alert("Download will start soon");

          const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'certificate.zip'); //any other extension
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
                Download Certificate
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
                      id="name"
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
                    <Form.Label className="event-name-label">
                      Certificate Type :
                    </Form.Label>
                  </Form.Row>
                  <Form.Row>
                    <Form.Control
                      id="type"
                      as="select"
                      className="col-12 col-md-11 mx-auto"
                      onChange={this.handleChange}
                    >
                      <option>Choose</option>
                      <option>Winner</option>
                      <option>Runner Up</option>
                      <option>Participation</option>
                      <option>Attandance</option>
                      
                    </Form.Control>
                  </Form.Row>
                </Form.Group>

                <Form.Group>
                  <Form.Row>
                    <Form.Label className="input-label col-12 col-md-11 mx-auto">{this.state.label}</Form.Label>
                  </Form.Row>
                  <Form.Row>
                    <Form.File
                      id="csv"
                      className="col-12 col-md-11 mx-auto"
                      label={this.state.browse}
                      data-browse="Browse"
                      custom
                      onChange={this.handleChange} />
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

export default CGenerate;
