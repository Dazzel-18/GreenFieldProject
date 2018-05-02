import React from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

class JobPage extends React.Component {
  constructor(props) {
 	super(props);

	this.state={
		// job info
		jobTitle:'',
		category:'',
		jobDescription:'',

		from:'',
		to:'',
		dateFrom: '',
		dateTo: '',

		// userinfo
		user:'',
		phoneNumber:0,
  }

}

componentDidMount(){
	 axios.get(`/jobinfo/${this.props.match.params.jobid}`)
    .then(response => {
    const jobInfo = response.data[0];
    //console.log(jobInfo);
    this.setState({
    	jobTitle:jobInfo.jobTitle,
    	category:jobInfo.category,
		from:jobInfo.from,
		to:jobInfo.to,
		jobDescription:jobInfo.jobDescription,
		dateFrom:jobInfo.dateFrom,
		dateTo:jobInfo.dateTo,
		user:jobInfo.userInfo.name,
		phoneNumber:jobInfo.userInfo.phoneNumber,

    })
    
  })
  .catch(function (error) {
    console.log(error);
  });

}
 
render() {
	return (
		<div id="details" className="container wrapper well">
			<div id="divv">
			<br />
			<h1>Job Info</h1>
			<br />
			<br />
			<Row>
			<Col md={2}>
			</Col>
			<Col md={3}>
			<span id="x"> jobTitle : </span>
			</Col>
			<Col md={2} id="x">
			{this.state.jobTitle}
			</Col>
			<Col md={3}>
			<span id="x"> jobCategory : </span>
			</Col>
			<Col md={3} id="x">
			{this.state.category}
			</Col>
			</Row><br />
			
			<Row>
			<Col md={2}>
			</Col>
			<Col md={3}>
			<span id="x"> JobDescription: </span>
			</Col>
			<Col md={2} id="x">
			{this.state.jobDescription}
			</Col>
			</Row><br />

			<Row>
			<Col md={2}>
			</Col>
			<Col md={3} id="y">
			Time:
			</Col>
			<Col md={2}>
			<span id="y">From : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.from}
			</Col>
			<Col md={1}>
			<span id="y"> To : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.to}
			</Col>
			</Row><br />

			<Row>
			<Col md={2}>
			</Col>
			<Col md={3} id="y">
			Date:
			</Col>
			<Col md={2}>
			<span id="y"> From : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.dateFrom}
			</Col>
			<Col md={1}>
			<span id="y"> To : </span>
			</Col>
			<Col md={2} id="y">
			{this.state.dateTo}
			</Col>
			</Row><br />
			</div>
			<hr/>

			<div id="divv">
			<br />
			<br />
			<h1> Job provider Info</h1>
			<br />
			<br />
			<Row>
			<Col md={2}>
			</Col>
			<Col md={3}>
			<span id="x"> Job Provider:</span>
			</Col>
			<Col md={2} id="x">
			{this.state.user}
			</Col>
			<Col md={2}>
			<span id="x">PhoneNumber:</span>
			</Col>
			<Col md={1} id="x">
			{this.state.phoneNumber}
			</Col>
			</Row><br />
			<br />
			</div>
			<br />
			<div>
				<button  id="but">show interest</button>
				<button  id="but">Assign the job</button>
			</div>

		</div>

	)
  }
}
export default JobPage;
