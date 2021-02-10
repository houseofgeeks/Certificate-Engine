import React from "react";
import { Form, Button} from 'react-bootstrap';
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

var ename = (ref) => (
  <Form.Group>
    <Form.Row>
      <Form.Label className="input-label">Event Name</Form.Label>
    </Form.Row>
    <Form.Row>
      <Form.Control
        id="eventName"
        value={eventName}
        onChange={ref.handleOptions}
        type="text"
        placeholder="Enter event name"
      />
    </Form.Row>
  </Form.Group>
);

var fname = (ref) => (
  <Form.Group>
    <Form.Row>
      <Form.Label className="input-label">Form Name</Form.Label>
    </Form.Row>
    <Form.Row>
      <Form.Control
        id="formName"
        value={formName}
        onChange={ref.handleOptions}
        type="text"
        placeholder="Enter form name"
      />
    </Form.Row>
  </Form.Group>
);

var options = (ref, i) => (
  <Form.Group>
    <Form.Row>
      <Form.Control
        id={i}
        as="select"
        className="col-12 col-md-5 mx-auto"
        onChange={ref.handleOptions}
      >
        <option>Choose</option>
        <option>Doc</option>
        <option>LongPara</option>
        <option>ShortPara</option>
      </Form.Control>

      <Button
        id={i}
        className="button col-12 col-md-5 mx-auto"
        onClick={ref.handleOptions}
      >
        Delete
      </Button>
    </Form.Row>
    <Form.Group></Form.Group>
    <Form.Row>
      <Button className="button" onClick={ref.handleSubmit}>
        Submit
      </Button>
    </Form.Row>
  </Form.Group>
);

var classref;

class RCreation extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: "False",
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

      const data = {
        etitle: classref.state.eventName,
        ftitle: classref.state.formName,
        fdata: JSON.stringify(info)
      }

      axios.post("https://cehg.herokuapp.com/createform",data)
      .then(res => {
        console.log(res);
        if (res.data['success'] === "True") {
          alert("Form Created Succesfully")
          classref.setState({ valid: res.data['success'] });
          classref.props.history.push("/rform", { data:res.data });
        }
        else {
          alert("Could not Create Form");
          classref.props.history.push("/rcreation");
        }
      });

      event.preventDefault();
    }

    render() {
      return (
        <div className="container-fluid form-creation-page">
          <div className="row justify-content-center">
            <div className="card  col-11 col-sm-10 col-md-8 col-lg-5 mx-2">
              <article className="card-body ">
                <h2 className="font-weight-normal text-center">Create Form</h2>
                <hr></hr>
                <Form>{this.state.elements}</Form>
              </article>
            </div>
          </div>
        </div>
      );
    }
}

export default RCreation;
