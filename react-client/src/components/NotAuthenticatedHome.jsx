import React from 'react';
import axios from 'axios';
import JobList from './JobList.jsx';
import Search from './Search.jsx'

class NotAuthenticatedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  logout() {
    var that=this
    event.preventDefault();
    axios.get('/logout')
        .then(function (response) {
            window.location.href = "/";
        })
        .catch(function (error) {
         console.log(error);
        });
      }

  searchJobCategory(category){
    var that = this;
   axios.post('/jobCategory', {"category": category})
        .then(function(response){
          const posts = response.data;
            that.setState({items: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
  }

  searchJobTitle(query) {
    var that = this;
     axios.post('/someJobs', {query:query})
          .then(function (response) {
            const posts = response.data;
            that.setState({items: posts});

        })
          .catch(function (error) {
            console.log(error);
        });
  
  }

//make new get requests for each filter
  componentDidMount() {
    axios.get('/jobs')
    .then(response => {
    const posts = response.data;
    this.setState({items:posts});
    
  })
  .catch(function (error) {
    console.log(error);
  });
  this.logout();
}

render() {
  
  return (
  
    <div>
    <br />
    <div>
    <Search searchJobTitle={this.searchJobTitle.bind(this)} searchJobCategory={this.searchJobCategory.bind(this)} />
    </div>
    <div>
    {this.state.items.map(function(item){
      return (

        <JobList item={item}/>
        )
      })}
    </div>
    </div>
    
    )
}
}
export default NotAuthenticatedHome;
