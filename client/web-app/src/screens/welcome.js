import React from "react";
import './styles/welcome.css';
import logo from "../assets/logo.svg";

class Welcome extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          url: ""
        }
    }

    handleClick() {
    this.props.history.push("/login"); 
  }

  handleClickA() {
    this.props.history.push("/aview");
  }

  handleClickC() {
    this.props.history.push("/rview");
  }

    render() {
        console.log(this.props.history);
        return (
         <div className="container-fluid welcome"> 
           <div className="row welcome-back">
              <nav className="navbar navbar-expand-lg  navbar-dark bg-transparent container-fluid">
                 <a className="navbar-brand" href="# "><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"></img>
                     <span className="brand-heading"> &nbsp;HG Certificate Engine</span>
                 </a>
                 <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li>
                      <button className="btn btn-sm btn-outline-secondary log-button text-white" onClick={() => this.handleClick()} type="button">Admin</button>
                    </li>
                  </ul>
                </div>
             </nav>
             <div className="col-12 col-md-7  heading text-white">
               <h3 className="head1">House of Geeks</h3><br></br>
               <h1 className="head2">Certificate Engine</h1><br></br><br></br>
               <div className="row">
                  <button className="btn btn-md btn-outline-secondary log-button text-white col-5" onClick={() => this.handleClickC()} type="button">Form</button>
                  <button className="btn btn-md btn-outline-secondary log-button text-white col-5" onClick={() => this.handleClickA()} type="button">Attend</button>
               </div>
             </div>
             <div className="col-12 col-md-5 ">
               <img className="logo" src={logo} alt="logo"></img>
                         </div>
             <div className="text-white col-12 text-center">
               <p className="intro-line">Create and Share Forms and Certificate on the way !!</p>
             </div>
           </div>
         </div>
        );
    }
}

export default Welcome;
