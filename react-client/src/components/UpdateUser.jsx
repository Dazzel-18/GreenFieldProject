import React from 'react';
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';
import UserInfo from './UserInfo.jsx';
class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      jobs: [],
      user:[]
    }
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
  that.getUserInfo();
}

getUserInfo(){
   var that=this;
    axios.get('/userInfo')
    .then(response => {
    const posts = response.data;
    console.log(posts);
    that.setState({user:posts});
    
  })
  .catch(function (error) {
    console.log(error);
  });
}

render() {
  
  
  return (
  
    <div id="profile">
    <br/>
    <div>
    <UserInfo user={this.state.user}/>
    </div>
    </div>
    
    )
}
}
export default UpdateUser;
