import React from "react";
import { Form, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import axios from 'axios';
import './styles/rform.css';
import ShortPara from './components/cshortpara.js';
import LongPara from './components/clongpara.js';
import Doc from './components/cdoc.js';

var classref;

var contact = {};
var info=[];

var options = (ref) =>
(
  <Form.Group>
  <Form.Row>
  <Col>
  <Button className="button" onClick={ref.handleSubmit}>Submit</Button>
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

      //console.log(classref.props.location.state.data.data.edata);

      info = JSON.parse(classref.props.location.state.data.data.fdata);
      var con = JSON.parse(classref.props.location.state.data.data.edata);
      contact = { type: "contact", name: con.contactName, email: con.contactEmail, phone: con.contactNumber }
      info.splice(2, 0, contact);

      if(info.length >= 4)
      {
        for(var obj = 0; obj < info.length; obj++)
        {
          console.log(info[obj]);
          if(info[obj].type === "eventName")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <center><h1 className="text-dark">{info[obj].eventName}</h1></center>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "contact")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-dark move-to-center"><span className="text-info">Contact Name : </span >{info[obj].name}</h6></span>);
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-dark move-to-center"><span className="text-info">Contact Email : </span>{info[obj].email}</h6></span>);
            classref.state.elements.splice(classref.state.elements.length - 1,0, <span><h6 className="text-dark move-to-center"><span className="text-info">Contact Number : </span>{info[obj].phone}</h6><hr className="bg-success"></hr></span>);
            classref.setState({elements: classref.state.elements});
          }
          else if(info[obj].type === "formName")
          {
            classref.state.elements.splice(classref.state.elements.length - 1,0, <center><h4 className="text-dark">{info[obj].formName}</h4><hr className="bg-success"></hr></center>);
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

      var data = new FormData();

      for (var i of classref.state.data)
      {
        if(i != undefined)
        {
          if(i.type === "Doc")
          {
            data.append(i.label, 'Not supported');
          }
          else
          {
            data.append(i.label, i.text);
          }
        }
      }

      console.log(data);

      axios.post("http://localhost:3001/submitform",data)
      .then(res => {
        //classref.setState({valid: res.valid});
      });

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
         <div className="container-fluid form-render-page">
         <div className="row justify-content-center">
           <div className="card  col-11 col-sm-10 col-md-8 col-lg-5 mx-2">
             <article className="card-body ">
               <Form>
               {this.state.elements}
               </Form>
             </article>
           </div>
         </div>
       </div>
      );
    }
}

export default RForm;
