import React from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

class JobPage extends React.Component {
  constructor(props) {
 	super(props);

	this.state={
		jobTitle:'',
		user:'',
		category:'',
		from:'',
		to:'',
		phoneNumber:'',
		jobDescription:'',
		phoneNumber:0
 	
  }

}

componentDidMount(){
	 axios.get(`/jobinfo/${this.props.match.params.jobid}`)
    .then(response => {
    const jobInfo = response.data;
    console.log(jobInfo);
    this.setState({
    	jobTitle:jobInfo.jobTitle,
    	user:jobInfo.user,
		category:jobInfo.category,
		from:jobInfo.from,
		to:jobInfo.to,
		jobDescription:jobInfo.jobDescription,
		//phoneNumber:jobInfo.phoneNumber
 
    })

    
  })
  .catch(function (error) {
    console.log(error);
  });

}

// user data still need to be added 

// need to style 
 
render() {
	return (
		<div>
			<div> jobTitle :
			{this.state.jobTitle}
			</div>

			<div> jobCategory :
			{this.state.category}
			</div>
			<div> JobDescription
			{this.state.jobDescription}
			</div>

			<div> From :
			{this.state.from}
			</div>

			<div> To :
			{this.state.to}
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
