import React from 'react';
import {FormControl} from "react-bootstrap";
import axios from 'axios';
import JobList from './JobList.jsx';


class UserProfile extends React.Component {
  
constructor(props) {
    super(props);

    this.state = {
      value: '',
      user:[],
      userJobs:[],
      test:false
    };

    this.SearchUser  = this.SearchUser.bind(this);
    this.SearchButton = this.SearchButton.bind(this);
    
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
    //some Info about user
   axios.get('/findUser/'+this.state.value)
        .then(function(response){
          const posts = response.data;
            that.setState({user: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
          //info about Jobs in this user
    axios.get('/userJobss/'+this.state.value)
        .then(function(response){
          const posts = response.data;
            that.setState({userJobs: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
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
    }else{

    
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
        <h2>Name:{this.state.user.name}</h2> 
        <h2>email:{this.state.user.email}</h2>
        <h2>phoneNumber:{this.state.user.phoneNumber}</h2>
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

















