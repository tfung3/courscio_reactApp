import React, { Component } from 'react';
import './index.css';
import App from './App';
import Search from './Search';

class MainBoard extends Component{
	constructor(props){
		super(props)
		this.state = {
			isExist: true
		}
	}

	render(){
		return(
			<div>
			<nav className="row navbar navbar-expand-lg navbar-light">
				<div className= "col-sm-0 col-md-0 col-lg-1"></div>
				
				<a className="navbar-brand col-sm-1 col-md-1 col-lg-1" href="home.html">
					<img className="image-fluid col-xs-1" id="logo" src="/Logo.png" alt="logo"/>
				</a>	

				<div className="container order-xs-last" id="navcontainer">
				<Search />
				</div>	

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>	

				<div className="collapse navbar-collapse col-md-auto col-lg-4" id="navbarSupportedContent">
					<ul className="navbar-nav navbar-right">
						<li className="nav-item"><a href="home.html">Home</a></li>
						<li className="nav-item"><a href="home.html">About us</a></li>
						<li className="nav-item"><a href="google_api_test.html">Contact us</a></li>
						<li className="nav-item"><a href="home.html">Sign up/Login</a></li>
					</ul>
				</div>
				<div className= "col-xs-0 col-md-0 col-lg-1"></div>
			</nav>	

			<div id="root"></div>
			<App />
			</div>

		
		)	
	}
}

export default MainBoard;