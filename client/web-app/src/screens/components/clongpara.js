import React from "react";
import { Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/cshortpara.css';

export default class LongPara extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          type: "LongPara",
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
          <Form.Label className="input-label">{this.state.label}</Form.Label>
          </Form.Row>
          <Form.Row className="pl-4 pr-4">
              <Form.Control value={this.state.text} onChange={this.handleChange} 
              as="textarea" rows={3} type="text" placeholder={this.state.hint}/>
          </Form.Row>
          </Form.Group>
        );
    }
};
