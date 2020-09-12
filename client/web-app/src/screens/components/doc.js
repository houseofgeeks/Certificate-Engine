 import React from "react";
import { Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/doc.css';

export default class Doc extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          type: "Doc",
          id: this.props.id,
          label: "",
          browse: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      if(event.target.id === "label")
      {
        this.setState({label: event.target.value}, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      }
      else if(event.target.id === "browse")
      {
        this.setState({browse: event.target.value}, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      }
    }

    render() {
        return (
          <Form.Group>
          <Form.Row>
          <Form.Label className="text-success">Doc</Form.Label>
          </Form.Row>
          <Form.Row>
          <Form.Control id="label" value={this.state.label} onChange={this.handleChange} type="text" placeholder="Set Label"/>
          </Form.Row>
          </Form.Group>
        );
    }
};
