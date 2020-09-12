import React from "react";
import { Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/cshortpara.css';

export default class ShortPara extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          type: "ShortPara",
          id: this.props.id,
          label: this.props.label,
          text: "",
          hint: this.props.hint
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value},() => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
    }

    render() {
        return (
          <Form.Group>
          <Form.Row>
          <Form.Label className="text-success">{this.state.label}</Form.Label>
          </Form.Row>
          <Form.Row>
          <Form.Control value={this.state.text} onChange={this.handleChange} type="text" placeholder={this.state.hint}/>
          </Form.Row>
          </Form.Group>
        );
    }
};
