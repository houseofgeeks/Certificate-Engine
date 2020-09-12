import React from "react";
import { Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/cshortpara.css';

export default class Doc extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          type: "Doc",
          id: this.props.id,
          label: this.props.label,
          browse: "",
          file: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({file: event.target.files[0]});
        this.setState({browse: event.target.files[0].name},() => {
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
          <Form.File
          label={this.state.browse}
          data-browse="Browse"
          custom
          onChange={this.handleChange}/>
          </Form.Row>
          </Form.Group>
        );
    }
};
