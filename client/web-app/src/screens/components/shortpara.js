import React from "react";
import { Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/shortpara.css';

export default class ShortPara extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          type: "ShortPara",
          id: this.props.id,
          label: "",
          hint: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      if(event.target.id === "label")
      {
        this.setState({label: event.target.value},() => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      }
      else if(event.target.id === "hint")
      {
        this.setState({hint: event.target.value},() => {
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
          <Form.Label className="text-success">ShortPara</Form.Label>
          </Form.Row>
          <Form.Row>
          <Form.Control id="label" value={this.state.label} onChange={this.handleChange} type="text" placeholder="Set Label"/>
          </Form.Row>
          <Form.Row>
          <Form.Control id="hint" value={this.state.hint} onChange={this.handleChange} type="text" placeholder="Set Text Hint"/>
          </Form.Row>
          </Form.Group>
        );
    }
};
