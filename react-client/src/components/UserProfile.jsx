import React from 'react';
import {FormControl, Row, Col,Button} from 'react-bootstrap';
import axios from 'axios';
import JobList from './JobList.jsx';
import StarRatingComponent from 'react-star-rating-component';

class UserProfile extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      user:[],
      userJobs:[],
      test:false,
      rating: 0,
      userRate:0,
      userTotal:0
    };
    this.SearchUser  = this.SearchUser.bind(this);
    this.SearchButton = this.SearchButton.bind(this);
    this.sendRate=this.sendRate.bind(this);
  }

  SearchUser(e) {
    this.setState({
      value: e.target.value
    });
  }

  SearchButton() {
    this.setState({
      test: true
    });
    var that = this;
    axios.get('/findUser/'+this.state.value)
    .then(function(response){
      const posts = response.data;
      that.setState({user: posts});
      that.setState({userRate:posts.rating.rate,userTotal:posts.rating.total})
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/userJobss/'+this.state.value)
    .then(function(response){
      const posts = response.data;
      that.setState({userJobs: posts});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendRate(){
    var that=this;
    axios.post('/rating' ,{rating:that.state.rating ,userName:this.state.value })
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
    var arr = [];
    this.state.userJobs.forEach(function(item,index) {
      arr.push(<JobList key={index} item={item} />)
    })
    if( this.state.test===false){
      return (
        <div>
          <FormControl
            id='catI'
            className="Sform-control"
            type="text"
            value={this.state.value}
            onChange={this.SearchUser}
            placeholder="Search"
          />
          <button onClick={this.SearchButton} >Search</button>
          <br/>
          <br/>
        </div>
      )
    } else {

      return (
        <div>
          <FormControl
            id='catI'
            className="Sform-control"
            type="text"
            value={this.state.value}
            onChange={this.SearchUser}
            placeholder="Search"     
          />
          <button onClick={this.SearchButton} >Search</button>
          <br/>
          <br/>
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
                <h2 id="h2">Rating: {this.state.rating}</h2>

                <StarRatingComponent 
                  name="rate1" 
                  starCount={10}
                  value={this.state.rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
                <Button  onClick ={this.sendRate} type="submit" bsStyle="primary" bsSize="small">AddRate</Button>   
              </div>
            </div>
            <div className="col-md-9">
              <div>
              {arr}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default UserProfile;