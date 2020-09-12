import React from "react";
import { Form, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/rcreation.css';

import ShortPara from './components/cshortpara.js';
import LongPara from './components/clongpara.js';
import Doc from './components/cdoc.js';

var classref;

var contact = {type:"contact", name:"Prithwiraj Samanta",email:"prskid1000@gmail.com", phone:"6204570243"}
var info=[];

var options = (ref) =>
(
  <Form.Group>
  <Form.Row>
  <Col>
  <Button variant="success" onClick={ref.handleSubmit}>Submit</Button>
  </Col>
  </Form.Row>
  </Form.Group>
)


class RForm extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: true,
          source: "rcreation",
          elements: [options(this)],
          data: [{}]
        }
        classref=this
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
      const eventhandler = data => {
        classref.state.data[data.id] = data;
        classref.setState({data: classref.state.data});
        //console.log(classref.state.data);
      }

      if(classref.state.source === "rcreation")
      {
        info = classref.props.location.state.info;
        info.splice(2,0,contact);
        console.log(info.info);
      }
      else
      {
        /*const data = {
        }

        axios.post("",{data})
        .then(res => {
          this.setState({info: res.info});
          this.setState({valid: res.valid});
        });*/

        if(this.state.valid === false)
        {
          alert("Could not load the form");
          this.props.history.push("/rform");
        }
      }

      if(info.length >= 4)
      {
        for(var obj = 0; obj < info.length; obj++)
        {
          console.log(info[obj]);
          if(info[obj].type === "eventName")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <center><h1 className="text-light">{info[obj].eventName}</h1></center>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "contact")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-light"><span className="text-info">Contact Name:</span>{info[obj].name}</h6></span>);
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-light"><span className="text-info">Contact Email:</span>{info[obj].email}</h6></span>);
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-light"><span className="text-info">Contact Number:</span>{info[obj].phone}</h6><hr className="bg-success"></hr></span>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "formName")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <center><h4 className="text-white">{info[obj].formName}</h4><hr className="bg-success"></hr></center>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "Doc")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <Doc id={obj} label={info[obj].label} onChange={eventhandler}/>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "LongPara")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <LongPara id={obj} label={info[obj].label} hint={info[obj].hint} onChange={eventhandler}/>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "ShortPara")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <ShortPara id={obj} label={info[obj].label} hint={info[obj].hint} onChange={eventhandler}/>);
            classref.setState({elements: classref.state.elements});
          }
        }
      }
      else
      {
        classref.setState({elements: []});
      }

    }

    handleSubmit(event) {

      console.log(classref.state.data);

      /*const data = {
        data:classref.state.data
      }

      axios.post("",{data})
      .then(res => {
        classref.setState({valid: res.valid});
      });*/

      if(classref.state.valid === false)
      {
        alert("Could not upload data");
        classref.props.history.push("/rform");
      }
      else
      {
        alert("Data uploaded successfully");
        classref.props.history.push("/rform");
      }
      event.preventDefault();
    }
    render() {
      return (
        <span className="container py-5 align-items-center">
        <Form className="form border border-success bg-dark align-items-center">
        {this.state.elements}
        </Form>
        </span>
      );
    }
}

export default RForm;
