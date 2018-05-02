import React, { Component } from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import JobPage from '../components/JobPage.jsx';



//import JobPage from './JobPage';

import axios from 'axios';

class JobList extends React.Component {
  constructor(props) {
  	
    super(props);

    this.state={ states:{
    	_id:'',
      user: '',
      jobTitle: '',
      jobDescription: '',
      category: '',
      from: '',
      to: '',
  	  comments:[]},
      message:'',
      arr:[]
    }
    
    this.addComment = this.addComment.bind(this);
    this.onChange = this.onChange.bind(this);

    
  }
  onChange(e){
  	this.setState({
  		states:{
  		_id:this.props.item._id,
  		user:this.props.item.user,
    	jobTitle:this.props.item.jobTitle,
    	jobDescription:this.props.item.jobDescription,
    	category:this.props.item.category,
    	from:this.props.item.from,
    	to:this.props.item.to,
  		comments:e.target.value,
  	},
  	message:''
  	})
  }
addComment(event) {
	
	console.log(this.state.states)
		var that=this;
		event.preventDefault();
		axios.post('/comment' ,{states:this.state.states})
  			.then(function (response) {
  				that.setState({message:"sendComment"}); 
    		
  			})
  			.catch(function (error) {
    		console.log(error);
  			});	

  			event.preventDefault();
		axios.get('/comment/'+this.props.item._id)
  			.then(function (response) {
  				const posts = response.data;
				that.setState({arr:posts});
  				that.setState({message:"Update"}); 
    			console.log(that.state.arr)
  			})
  			.catch(function (error) {
    		console.log(error);
  			});	
		};

        
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
            <Col md={4}>
        <span>
        {this.state.arr.map(function(a){
        	return(
        		<div>
        		<span><b>Name : </b></span>
        		<span>{a.username}</span>
			<span><b>comment : </b></span>
			<span>{a.text}</span>
			</div>
        		)
        })}
        </span>
			</Col>
		</Row><br />
		<Row>
            <Col md={4}>
            <span><FormControl
          id='catI'
          className="Sform-control"
          type="text"
          value={this.state.value}
          onChange={this.onChange}
          placeholder="Write Comment"
          
        />
        <button onClick={this.addComment} >Add Comment</button>
        <br/>
        <br/></span>
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