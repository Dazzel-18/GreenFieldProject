import React from 'react';
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';
import UserInfo from './UserInfo.jsx';
import {FormControl, Row, Col,Button} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      jobs: [],
      user:[],
      myJobs:[],
      rating: 0,
      userRate:0,
      userTotal:0,
      takenBy:[]
    }
    this.sendRate=this.sendRate.bind(this);
  }

  componentDidMount() {
    var that =this;
    axios.get('/userJobs')
    .then(response => {
      const posts = response.data;
      that.setState({jobs:posts}); 
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/UserInfo')
    .then(response => {
      const posts = response.data;
      that.setState({user:posts});
      that.setState({userRate:posts.rating.rate,userTotal:posts.rating.total})
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/taken')
    .then(response => {
      const posts = response.data;
      that.setState({takenBy:posts});
      console.log(that.state.takenBy)
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/taken')
    .then(response => {
      const posts = response.data;
      that.setState({takenBy:posts});
      console.log(that.state.takenBy) 
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendRate(){
    var that=this;
    axios.post('/rating',{rating:that.state.rating ,userName:this.state.user.userName})
    .then(response=>{
    })
    .catch(function (error){
      console.log(error);
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  render() {
    console.log(this.state.user)
    var arr = [];
    var arrayForUser =[];
    this.state.jobs.forEach(function(item,index) {
      arr.push(<JobsForUser key={index} item={item} />)
    })
    this.state.takenBy.forEach(function(item,index) {
      arrayForUser.push(<JobsForUser key={index} item={item} />)
    })
  
    return (
      <div id="profile">
        <div className="row " >
          <div className="col-md-3 "  >
            <img  src={this.state.user.image}/>
            <h2 id="h2">Name:</h2>
            <p id="p2"> {this.state.user.name}</p>
            <h2 id="h2">email:</h2>
            <p id="p2"> {this.state.user.email}</p>
            <h2 id="h2">phoneNumber:</h2> 
            <p id="p2">{this.state.user.phoneNumber}</p>
            <div>
              <h2>Rating: {Math.round(this.state.userRate/this.state.userTotal)}</h2>
            </div>
          </div>
          <div className="col-md-9">
              <h1>
              My Jobs
              </h1>
              <div>
              {arr}
            </div>  
            <br />
            <br />
            <div>
              <h1>
              Assign Jobs
              </h1>
              <br/>
              <br/>
              <div>
                {arrayForUser}
              </div>
            </div>
          </div>
        </div>
      </div>    
    )
  }
}
export default Profile;