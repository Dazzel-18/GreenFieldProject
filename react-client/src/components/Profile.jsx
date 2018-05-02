import React from 'react';
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';
import UserInfo from './UserInfo.jsx';
import {FormControl, Row, Col,Button} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { 
      jobs: [],
      user:[],
      myJobs:[],
      rating: 0
    }
    this.sendRate=this.sendRate.bind(this);
  }
//make new get requests for each filter
  componentDidMount() {
    var that =this;
    axios.get('/userJobs')
    .then(response => {
    const posts = response.data;
    that.setState({jobs:posts});
    
  }).catch(function (error) {
    console.log(error);
  });
  axios.get('/UserInfo')
    .then(response => {
    const posts = response.data;
    that.setState({user:posts});
   
  }).catch(function (error) {
    console.log(error);
  });
}
  sendRate(){
    var that=this;
    axios.post('/rating',{rating:that.state.rating ,userName:this.state.user.name})
  .then(response=>{
    console.log(rating)
  }).catch(function (error){
    console.log(error);
  });
  
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
render() {
  var arr = [];
  

    this.state.jobs.forEach(function(item,index) {
      arr.push(<JobsForUser key={index} item={item} />)
    })
  
  
  return (
  
    <div id="profile">

    <div className="row " >
     <div className="col-md-3 "  >
        <img  src={this.state.user.image}/>
        <h2>Name:{this.state.user.name}</h2> 
        <h2>email:{this.state.user.email}</h2>
        <h2>phoneNumber:{this.state.user.phoneNumber}</h2>
        <div>
          <h2>Rating: {this.state.rating}</h2>
          <StarRatingComponent 
            name="rate1" 
            starCount={10}
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          /><Button  onClick ={this.sendRate} type="submit" bsStyle="primary" bsSize="small">AddRate</Button> 
      </div>
    </div>
         

    <div className="col-md-9">

    <div>
    {arr}
    </div>

    </div>
     </div>
    <br />
    <br />

    <div>
    <h1>
    Job For This User
    </h1>
    <br/>
    <br/>
    <div>
    {arr}
    </div>
    </div>
    </div>
    
    )
}
}
export default Profile;
