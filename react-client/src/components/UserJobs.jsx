import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';

class UserJobs extends React.Component {
   constructor(props) {
    super(props);
    this.state = {states:{
      user: '',
      jobTitle: '',
      jobDescription: '',
      salary: '',
      category: '',
      from: '',
      to: ''},
      message:''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }

  onChange(e) {
    var states = this.state.states;
    var name = e.target.name;
    var value = e.target.value;
    states[name] = value;
      this.setState({states:states});
  };

  componentDidMount() {
    var that =this
    axios.post('/userJob',{jobTitle:that.props.match.params.jobTitle,
    user:that.props.match.params.userName})
    .then(response => {
      const posts = response.data;
      console.log(posts);
      this.setState({states:posts});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSubmit(event) {
    var that =this;
    event.preventDefault();
    axios.put('/updateUserJob', {states:this.state.states,jobTitle:that.props.match.params.jobTitle})
    .then(function (response) {
      that.setState({message:"Job Updated"});
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  render() {
    return (
      <center>
        <div id="jobform" className="container wrapper well"><br /><br /><br />
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Row>
                <Col md={1}>
                </Col>
                <Col md={2}>
                  <span>JOb Title</span>
                </Col>
                <Col md={3}>
                  <label >
                    <FormControl type = "text" name = "jobTitle" placeholder = "Job Title" autoFocus
                      required onChange={this.onChange}  value={this.state.states.jobTitle}
                    />
                  </label>
                </Col>
              </Row>
              <br />
              <Col md={1}>
              </Col>
              <Col md={2}>
                <span>Category</span>
              </Col>
              <Col md={3}>
                <label >
                  <div className="form-group">
                    <select name = "category" className="form-control selectpicker btn btn-default" 
                      id="catJobs" onChange={this.onChange} value={this.state.states.category}>
                      <option value="Select">Select Category</option>
                      <option value="Driver">Driver</option>
                      <option value="Home Maintenance">Home Maintenance</option>
                      <option value="Computer Maintenance">Computer Maintenance</option>
                      <option value="Babysitting">Babysitting</option>
                      <option value="Tutoring">Tutoring</option>
                    </select>
                  </div>
                </label>
              </Col>
              <Col md={2}>
                <span>Salary</span>
              </Col>
              <Col md={3}>
                <label >
                  <FormControl type = "text" name = "salary" placeholder = "Salary" autoFocus
                    required onChange={this.onChange}  value={this.state.states.salary}
                  />
                </label>
              </Col>
            </Row> <br />

            <Row>
              <Col md={1}>
              </Col> 
              <Col md={2}>
                <span>Job Description</span>
              </Col>
              <Col md={8}>
                <label >
                  <FormControl  componentClass="textarea" rows={2} cols={90} name="jobDescription" placeholder = "Job Description"
                    autoFocus required onChange={this.onChange} value={this.state.states.jobDescription}
                  />
                </label>
              </Col>
              <Col md={1}>
              </Col> 
            </Row><br />
            <Row>
              <Col md={1}>
              </Col> 
              <Col md={2}>
                <span>From</span>
              </Col>
              <Col md={3}>
                <label >
                  <FormControl type = "time" name = "from" placeholder = "From" autoFocus
                    required onChange={this.onChange} value={this.state.states.from}
                  />
                </label>
              </Col>
              <Col md={2}>
                <span>To</span>
              </Col>
              <Col md={3}>
                <label >
                  <FormControl type = "time" name = "to" placeholder = "To" autoFocus 
                    required onChange={this.onChange} value={this.state.states.to}
                  />
                </label>
              </Col>
              <Col md={1}>
              </Col>
            </Row><br /><br />

            <Button id="jobb" className="btn btn-primary" type="submit" bsSize="large" >
                  Update
            </Button> 
            <h3 className="SuccessMessage">{this.state.message}</h3>
          </form><br />
        </div>
      </center>
    )
  }
}
export default UserJobs;