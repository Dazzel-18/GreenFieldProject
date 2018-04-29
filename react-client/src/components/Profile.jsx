import React from 'react';
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';
import Search from './Search.jsx';
import UserInfo from './UserInfo.jsx';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      jobs: [],
      user:[]
    }
  }


//make new get requests for each filter
  componentDidMount() {
    axios.get('/userJobs')
    .then(response => {
    const posts = response.data;
    this.setState({jobs:posts});
    
    
  }).catch(function (error) {
    console.log(error);
  });
  this.getUserInfo();
}

getUserInfo(){
    axios.get('/userInfo')
    .then(response => {
    const posts = response.data;
    console.log(posts);
    this.setState({user:posts});
    
  })
  .catch(function (error) {
    console.log(error);
  });
}

render() {
  var arr = [];
  
    this.state.jobs.forEach(function(item) {
      arr.push(<JobsForUser item={item} />)
    })
  
  return (
  
    <div id="profile">
    <br/>
    <div>
    <UserInfo user={this.state.user}/>
    </div>
    <div>
    {arr}
    </div><br /><br />
    </div>
    
    )
}
}
export default Profile;
