import React, { Component } from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import JobPage from '../components/JobPage.jsx';
class JobList extends React.Component {
  constructor(props) {
  	
    super(props);
  }


 
render() {
	let phonNum=0;
	if(this.props.item.userInfo.length>0){
		 phonNum=this.props.item.userInfo[0].phoneNumber;
	}
	
  return (
  	<div>
  	<div id ='postDiv' className="jobsDiv container"><br />
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
			<span><b>Job Category : </b></span>
			<span>{this.props.item.category}</span>
			</Col>
		</Row><br />
		
        <Row>
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
