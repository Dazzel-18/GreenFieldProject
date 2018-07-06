import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBarComponent extends React.Component {
	render(){
    	if(this.props.session){
    	return(
			<nav className="navbar navbar-fixed-top" id="nav">
				<div >
					<ul id='HNA'>
						<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
						<li id='Na'><NavLink to = "/jobsForm" activeClassName = "is-active" >Add Job</NavLink></li>
						<li id='Na'><NavLink to = "/UpdateUser" activeClassName = "is-active" >UpdateUserProfile</NavLink></li>
						<li id='Na'><NavLink to = "/Profile" activeClassName = "is-active" >Profile</NavLink></li>
						<li id='Na'><NavLink to = "/userProfile" activeClassName = "is-active" > SearchUser</NavLink></li>
						<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/logout" activeClassName = "is-active" >Logout</NavLink></li>
					</ul>
				</div>
			</nav>
		);

    	} else {
    		return(
				<nav className="navbar navbar-fixed-top" >
  					<div id="nav">
						<ul id='HNA'>
						<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
						<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/login" activeClassName = "is-active" >Login</NavLink></li>
						<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/signup" activeClassName = "is-active" >Sign up</NavLink></li>
						</ul>
	 				</div>
				</nav>
			);
    	}    
 	}
}

export default NavBarComponent