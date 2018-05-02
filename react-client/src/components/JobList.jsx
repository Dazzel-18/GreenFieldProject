import React, { Component } from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import JobPage from '../components/JobPage.jsx';


//import JobPage from './JobPage';

class JobList extends React.Component {
  constructor(props) {
  	
    super(props);

    
  }


 
render() {
	let phonNum=0;
	if(this.props.item.userInfo.length>0){
		 phonNum=this.props.item.userInfo[0].phoneNumber;
	}
	let image;
	if(this.props.item.category==="Driver"){
		image="https://cdn2.iconfinder.com/data/icons/professionals-flat-colorful/614/1583_-_Driver_Male-256.png";
	}else if(this.props.item.category==="Home Maintenance"){
		image="https://cdn2.iconfinder.com/data/icons/professionals-flat-colorful/614/1592_-_Mechanic_Male-256.png";
	}else if(this.props.item.category==="Computer Maintenance"){
		image="https://cdn2.iconfinder.com/data/icons/professionals-flat-colorful/614/1609_-_Software_Engineer-256.png";
	}else if(this.props.item.category==="Babysitting"){
		image="https://cdn2.iconfinder.com/data/icons/professionals-flat-colorful/614/1590_-_Maid-256.png";
	}else if(this.props.item.category==="Tutoring"){
		image="https://cdn2.iconfinder.com/data/icons/professionals-flat-colorful/614/1614_-_Teacher_Female-256.png";
	}
	
  return (
  	<div>
  	<div id ='postDiv' className="jobsDiv container"><br />

  		<Row>
            <Col md={4}>
            <img src={image} className="image"/>
			</Col>
			<Col md={4}>
			</Col>

			<Col md={4}>
			<br/>
			<span><b>Job Category : </b></span>
			<span>{this.props.item.category}</span>
			</Col>
		</Row><br />
        
  		<Row>
			<Col md={4}>
			<span><b>Job Provider : </b></span>
			<span>{this.props.item.user}</span>
			</Col>
			<Col md={4}>
			<span><b>Job Title : </b></span>
			<span>{this.props.item.jobTitle}</span>
			</Col>
			<Col md={4}>
            <span><Link to={`/jobinfo/${ this.props.item._id}`} >Show Details :</Link></span>


			</Col>
		</Row><br />		
       
		 <Row>
		 <Col md={8}>
			</Col>
		 <Col id='postTime' md={4}>
			<span><b>Posted at : </b></span>
			<span>{this.props.item.created_at.slice(0, 10)}</span>
			</Col>
		 </Row>
    </div><br />
    </div>
    )
  }
}
export default JobList;