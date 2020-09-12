import React from "react";
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/rstop.css';

class RStop extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: true,
          name: "",
          form: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(event) {
      if(event.target.id === "1")
      {
        this.setState({name: event.target.value});
      }
      else if(event.target.id === "2")
      {
        this.setState({form: event.target.value});
      }
    }

    handleSubmit(event) {
      //console.log(this.state);

      /*const data = {
        name: this.state.name,
        form: this.state.form
      }

      axios.post("",{data})
      .then(res => {
        this.setState({valid: res.valid});
      });*/

      if(this.state.valid === true)
      {
        alert("Form Stopped Succesfully")
        this.props.history.push("/dashboard");
      }
      else
      {
        alert("Could not stop form");
        this.props.history.push("/rstop");
      }
      console.log(this.state);
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
            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Event Name</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id="1"  value={this.state.name} onChange={this.handleChange} type="text" placeholder="Type exactly as it is" />
            </Form.Row>
            </Form.Group>
            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Form Name</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id="2" value={this.state.form} onChange={this.handleChange} type="text" placeholder="Type exactly as it is" />
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

export default RStop;
