import React from "react";
import { Form, Button, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/rcreation.css';

import ShortPara from './components/shortpara.js';
import LongPara from './components/longpara.js';
import Doc from './components/doc.js';

var eventName;
var formName;
var info=[];

var ename = (ref) =>
(
  <Form.Group>
  <Form.Row>
  <Form.Label className="text-success">Event Name</Form.Label>
  </Form.Row>
  <Form.Row>
  <Form.Control id="eventName" value={eventName} onChange={ref.handleOptions} type="text" placeholder="Enter event name"/>
  </Form.Row>
  </Form.Group>
)

var fname = (ref) =>
(
  <Form.Group>
  <Form.Row>
  <Form.Label className="text-success">Form Name</Form.Label>
  </Form.Row>
  <Form.Row>
  <Form.Control id="formName" value={formName} onChange={ref.handleOptions} type="text" placeholder="Enter form name"/>
  </Form.Row>
  </Form.Group>
)

var options = (ref, i) =>
(
  <Form.Group>
  <Form.Row>
  <Col>
  <Form.Control id={i} className="bg-dark text-white" as="select" onChange={ref.handleOptions}>
  <option>Choose</option>
  <option>Doc</option>
  <option>LongPara</option>
  <option>ShortPara</option>
  </Form.Control>
  </Col>
  <Col>
  <Button id={i} variant="danger" onClick={ref.handleOptions}>Delete</Button>
  </Col>
  </Form.Row>
  <Form.Group>

  </Form.Group>
  <Form.Row>
  <Col>
  <Button variant="success" onClick={ref.handleSubmit}>Submit</Button>
  </Col>
  </Form.Row>
  </Form.Group>
)

var classref;

class RCreation extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: true,
          formName: "",
          eventName:"",
          elements: [ename(this),fname(this),options(this,1)],
          data: [{},{},{},{}]
        }
        classref = this;
        this.handleOptions = this.handleOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleOptions(event) {
      var len = classref.state.elements.length;
      if(event.target.id === "formName")
      {
        formName = event.target.value;
        classref.setState({formName: event.target.value});
      }
      else if(event.target.id === "eventName")
      {
        eventName = event.target.value;
        classref.setState({eventName: event.target.value});
      }
      else if(event.target.type === "button" && classref.state.elements.length >= 4)
      {
        classref.state.elements.splice(classref.state.elements.length - 2,1);
        classref.state.data.splice(classref.state.data.length - 2,1);
        classref.setState({data: classref.state.data});
        classref.setState({elements: classref.state.elements});
      }
      else if(event.target.type === "select-one")
      {
        if(event.target.value === "Doc")
        {
          const eventhandler = data => {
            classref.state.data[data.id] = data;
            classref.setState({data: classref.state.data});
            //console.log(classref.state.data);
          }
          classref.state.elements.splice(classref.state.elements.length - 1,0, <Doc id={len + 1} onChange={eventhandler}/>);
          classref.setState({elements: classref.state.elements});
        }
        else if(event.target.value === "ShortPara")
        {
          const eventhandler = data => {
            classref.state.data[data.id] = data;
            classref.setState({data: classref.state.data});
            //console.log(classref.state.data);
          }
          classref.state.elements.splice(classref.state.elements.length - 1,0, <ShortPara id={len + 1} onChange={eventhandler}/>);
          classref.setState({elements: classref.state.elements});
        }
        else if(event.target.value === "LongPara")
        {
          const eventhandler = data => {
            classref.state.data[data.id] = data;
            classref.setState({data: classref.state.data});
            //console.log(classref.state.data);
          }
          classref.state.elements.splice(classref.state.elements.length - 1,0, <LongPara id={len + 1} onChange={eventhandler}/>);
          classref.setState({elements: classref.state.elements});
        }
      }
      //console.log(classref.state);
    }

    handleSubmit(event) {
      info.splice(info.length - 1,0, {type:"formName", formName:classref.state.formName});
      info.splice(info.length - 1,0, {type:"eventName", eventName:classref.state.eventName});
      for(var i = 0; i < classref.state.data.length; i++)
      {
        if(classref.state.data[i].type === "Doc")
        {
          info.splice(info.length,0, {type:"Doc", label:classref.state.data[i].label});
        }
        else if(classref.state.data[i].type === "LongPara")
        {
          info.splice(info.length,0, {type:"LongPara", label:classref.state.data[i].label, hint:classref.state.data[i].hint});
        }
        else if(classref.state.data[i].type === "ShortPara")
        {
          info.splice(info.length,0, {type:"ShortPara", label:classref.state.data[i].label, hint:classref.state.data[i].hint});
        }
      }
      //console.log(info);

      /*const data = {
        info: classref.state.info
      }

      axios.post("",{data})
      .then(res => {
        this.setState({valid: classref.valid});
      });*/

      if(classref.state.valid === true)
      {
        alert("Form Created Succesfully")
        classref.props.history.push("/rform",{info:info});
      }
      else
      {
        alert("Could not create form");
        classref.props.history.push("/rcreation");
      }

      event.preventDefault();
    }

    render() {
        return (
          <span className="container py-5">
          <Form className="form border border-success bg-dark">
          {this.state.elements}
          </Form>
          </span>
        );
    }
}

export default RCreation;
