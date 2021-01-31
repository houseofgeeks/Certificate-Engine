import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from "axios";
import "./styles/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: "False",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
    if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {

    const user = {
        userid: this.state.email,
        password: this.state.password
      }

      axios.post("https://cehg.herokuapp.com/isauth",user)
      .then(res => {
        if (res.data['success'] === "True") {
          this.setState({ valid: res.data['success'] });
          this.props.history.push("/dashboard");
        } else {
          alert("Invalid username or password");
          this.props.history.push("/login");
        }
      });  
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid login-page">
        <div className="row justify-content-center">
          <div className="card  col-11 col-sm-10 col-md-8 col-lg-4 mx-2">
            <article className="card-body ">
              <h2 className="font-weight-normal text-center">Login</h2>
              <br></br>
              <form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Row>
                    <Form.Control
                      className="input"
                      value={this.state.email}
                      onChange={this.handleChange}
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Row>
                    <Form.Control
                      className="input"
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Row>
                    <Button
                      variant="success"
                      onClick={this.handleSubmit}
                      className="login-button"
                    >
                      Login
                    </Button>
                  </Form.Row>
                </Form.Group>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
