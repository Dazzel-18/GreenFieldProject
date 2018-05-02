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
		Job Info
			<div> jobTitle :
			{this.state.jobTitle}
			</div>

			<div> jobCategory :
			{this.state.category}
			</div>
			<div> JobDescription
			{this.state.jobDescription}
			</div>

			<div> Time :
			<div> From :
			{this.state.from}
			</div>

			<div> To :
			{this.state.to}
			</div>
			</div>

			<div> Date :
			<div> From :
			{this.state.dateFrom}
			</div>
		
		<div> To :
			{this.state.dateTo}
		</div>
		<hr/>

		<div>
		Job provider Info
			<div> Job Provider :
				{this.state.user}
			</div>

			<div> PhoneNumber:
				{this.state.phoneNumber}
			</div>
		</div>


		</div>	

			
			<div>
				<button>show interest</button>
			 </div>


			 <div>
				<button>Assign the job</button>
			 </div>
		 </div>

	)
  }
}
export default JobPage;
