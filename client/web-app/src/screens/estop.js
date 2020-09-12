import React from "react";
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/estop.css';

class EStop extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: true,
          name: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
      console.log(this.state);

      /*const data = {
        name: this.state.name
      }
      axios.post("",{data})
      .then(res => {
        this.setState({valid: res.valid});
      });*/

      if(this.state.valid === true)
      {
        alert("Event Stopped Succesfully")
        this.props.history.push("/dashboard");
      }
      else
      {
        alert("Could stop event");
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
          <span className="container">
          <Form className="form border border-success bg-dark">
            <Form.Group controlId="formBasicEmail">
            <Form.Row>
            <Form.Label className="text-success">Event Name</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control value={this.state.name} onChange={this.handleChange} type="text" placeholder="Type exactly as it is" />
            </Form.Row>
            </Form.Group>
            <Form.Group>
            <Form.Row>
            <Button variant="success" onClick={this.handleSubmit}>Stop</Button>
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Button variant="info" onClick={this.handleBack}>Dashboard</Button>
            </Form.Row>
            </Form.Group>
          </Form>
          </span>
        );
    }
}

export default EStop;
