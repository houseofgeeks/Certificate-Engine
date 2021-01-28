import React from "react";
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ecreation.css';
import axios from "axios";

class EPreview extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid : "False",
          title: "",
          startDate: "",
          endDate: "",
          contactName: "",
          contactEmail: "",
          contactNumber: "",

        }
    
        this.handleBack = this.handleBack.bind(this);
    }

  componentDidMount() {

    var data = JSON.parse(this.props.location.state.data);
    
    this.state.title = data.title;
    this.state.startDate = data.startDate;
    this.state.endDate = data.endDate;
    this.state.contactName = data.contactName;
    this.state.contactEmail = data.contactEmail;
    this.state.contactNumber = data.contactNumber;

    this.setState({state: this.state});
  }

    handleBack(event) {
      console.log(this.state);
      this.props.history.push("/dashboard");
      event.preventDefault();
    }

    render() {
        return (
          <div className="container-fluid event-creation-page">
            <div className="row justify-content-center">
              <div className="card  col-11 col-sm-10 col-md-8 col-lg-5 mx-2">
                <article className="card-body ">
                  <h2 className="font-weight-normal text-center">
                    View Event
                  </h2>
                  <hr></hr>
                  <Form>
                    {" "}
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">Title</Form.Label>
                      </Form.Row>
                      <Form.Row>
                        <Form.Control
                          id="1"
                          value={this.state.title}
                          type="text"
                          placeholder="Enter title"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">
                          Start Date
                        </Form.Label>
                        <Form.Control
                          id="2"
                          value={this.state.startDate}
                          type="date"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">
                          End Date
                        </Form.Label>
                        <Form.Control
                          id="3"
                          value={this.state.endDate}
                          type="date"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">
                          Contact Name
                        </Form.Label>
                      </Form.Row>
                      <Form.Row>
                        <Form.Control
                          id="4"
                          value={this.state.contactName}
                          type="text"
                          placeholder="Enter name"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">
                          Contact Email
                        </Form.Label>
                      </Form.Row>
                      <Form.Row>
                        <Form.Control
                          id="5"
                          value={this.state.contactEmail}
                          type="text"
                          placeholder="Enter email"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Form.Label className="input-label">
                          Contact Number
                        </Form.Label>
                      </Form.Row>
                      <Form.Row>
                        <Form.Control
                          id="6"
                          value={this.state.contactNumber}
                          type="text"
                          placeholder="Enter phone"
                        />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Button className="button" onClick={this.handleBack}>
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

export default EPreview;
