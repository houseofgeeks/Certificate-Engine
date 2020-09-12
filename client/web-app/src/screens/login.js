import React from "react";
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/login.css';

class Login extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: true,
          email: "",
          password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      if(event.target.type === "email")
      {
        this.setState({email: event.target.value});
      }
      if(event.target.type === "password")
      {
        this.setState({password: event.target.value});
      }
    }

    handleSubmit(event) {
      //console.log(this.state);

      /*const user = {
        email: this.state.email,
        password: this.state.password
      }

      axios.post("",{user})
      .then(res => {
        this.setState({valid: res.valid});
      });*/

      if(this.state.valid === true)
      {
        this.props.history.push("/dashboard");
      }
      else
      {
        alert("Invalid username or password");
        this.props.history.push("/login");
      }
      event.preventDefault();
    }

    render() {
        return (
          <span className="login">
          <Form className="form border border-success bg-dark">
            <Form.Group controlId="formBasicEmail">
            <Form.Row>
            <Form.Label className="text-success">Email address</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
            </Form.Row>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Row>
            <Form.Label className="text-success">Password</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" />
            </Form.Row>
            </Form.Group>
            <Form.Group>
            <Form.Row>
            <Button variant="success" onClick={this.handleSubmit}>Login</Button>
            </Form.Row>
            </Form.Group>
          </Form>
          </span>
        );
    }
}

export default Login;
