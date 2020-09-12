import React from "react";
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ecreation.css';

class ECreation extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid : true,
          title: "",
          startDate: "",
          endDate: "",
          contactName: "",
          contactEmail: "",
          contactNumber: "",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(event) {
      if(event.target.id === "1")
      {
        this.setState({title: event.target.value});
      }
      else if(event.target.id === "2")
      {
        this.setState({startDate: event.target.value});
      }
      else if(event.target.id === "3")
      {
        this.setState({endDate: event.target.value});
      }
      else if(event.target.id === "4")
      {
        this.setState({contactName: event.target.value});
      }
      else if(event.target.id === "5")
      {
        this.setState({contactEmail: event.target.value});
      }
      else if(event.target.id === "6")
      {
        this.setState({contactNumber: event.target.value});
      }
    }

    handleSubmit(event) {
      //console.log(this.state);

      /*const data = {
        title: this.state.title,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        contactName: this.state.contactName,
        contactEmail: this.state.contactEmail,
        contactNumber: this.state.contactNumber,
      }

      axios.post("",{data})
      .then(res => {
        this.setState({valid: res.valid});
      });*/

      if(this.state.valid === true)
      {
        alert("Event Created Succesfully")
        this.props.history.push("/dashboard");
      }
      else
      {
        alert("Could not create event");
        this.props.history.push("/ecreation");
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
          <span className="container py-5">
          <Form className="form border border-success bg-dark">

            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Title</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id = "1" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Enter title" />
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Start Date</Form.Label>
            <Form.Control id = "2" value={this.state.startDate} onChange={this.handleChange} type="date"/>
            </Form.Row>
            </Form.Group>
            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">End Date</Form.Label>
            <Form.Control id = "3" value={this.state.endDate} onChange={this.handleChange} type="date"/>
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Contact Name</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id = "4" value={this.state.contactName} onChange={this.handleChange} type="text" placeholder="Enter name" />
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Contact Email</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id = "5" value={this.state.contactEmail} onChange={this.handleChange} type="text" placeholder="Enter email" />
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Form.Label className="text-success">Contact Number</Form.Label>
            </Form.Row>
            <Form.Row>
            <Form.Control id = "6" value={this.state.contactNumber} onChange={this.handleChange} type="text" placeholder="Enter phone" />
            </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
            <Button variant="success" onClick={this.handleSubmit}>Create</Button>
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

export default ECreation;
