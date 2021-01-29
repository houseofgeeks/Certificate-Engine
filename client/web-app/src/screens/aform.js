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


class AForm extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          valid: "False",
          elements: [options(this)],
          title: "",
          ename: "",
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

      classref.setState({ title: classref.props.location.state.data });

      classref.state.elements.splice(classref.state.elements.length - 1, 0, <center><h1 className="text-dark">{classref.props.location.state.data}</h1></center>);
      classref.setState({ elements: classref.state.elements });

      classref.state.elements.splice(classref.state.elements.length - 1, 0, <ShortPara id={0} label="Name of Participant" hint="This will be Diplayed on Certificate" onChange={eventhandler} />);
      classref.setState({ elements: classref.state.elements });

    }

    handleSubmit(event) {


      axios.post("https://cehg.herokuapp.com/addSheet", { title: classref.state.title, id: classref.state.data[0].text})
      .then(res => {
        console.log(res);
        //classref.setState({valid: res.valid});
        if (res.data['success'] === "False") {
          alert("Could not upload data");
          classref.props.history.push("/aform");
        }
        else {
          alert("Data uploaded successfully");
          console.log(res);
          classref.props.history.push("/thanks");
        }
      });

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

export default AForm;
