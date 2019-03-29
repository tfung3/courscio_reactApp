import React, { Component } from 'react';
import {Card}from 'react-bootstrap'
import './index.css';
import axios from 'axios';
import App from './App';
import Search from './Search';

const API = '/api/v1/course/keyword?'

class MainBoard extends Component{
	constructor(){
		super()
		this.state = {
			isExist: true,
			search: "NONE",
			courses: []
		}
		this.handle_search = this.handle_search.bind(this);
		this.doSearch = this.doSearch.bind(this)
	}

	handle_search (search_val){
		this.setState({
			search: search_val
		});
		console.log(search_val)
		this.doSearch(search_val)
	}

	async doSearch(keyword){
		try{
			var courseRows = []
			let query = 'keyword=' + encodeURIComponent(keyword)
			console.log(query)
			const response = await axios.get(API + query)
			console.log("wait over")
			console.log(response)
			const result = response.data
			for(var i= 0; i< result.length; i++) {
				const cur_course = result[i];
				const courseRow = <Card className="classCard" bg="light" text="#383838" key={i}>
					<Card.Body>
					<Card.Title>{cur_course.cname}&nbsp;&nbsp;{cur_course.title}</Card.Title>
					<Card.Subtitle className="text-muted">CRN&nbsp;{cur_course.crn}&nbsp;&nbsp;Credit:&nbsp;{cur_course.credit}</Card.Subtitle>
						<div className="card-text">
							<table>
							<tbody>      
							<tr>       
								<td className="rowTitle">Description:</td>
								<td>{cur_course.description}</td>
							</tr>
							<tr>
								<td className="rowTitle">Time:</td>
								<td className="trim-text">{cur_course.weekday}&nbsp;{cur_course.start_t}-{cur_course.end_t}</td>
								<td className="rowTitle">Location: </td>
								<td>{cur_course.location}</td>
							</tr>
							</tbody>
							</table>
						</div>
					</Card.Body>
					<br />
				</Card>
				courseRows.push(courseRow)
			}
			this.setState({
				courses: courseRows
			})
		} catch {
			console.log("ERROR")
			this.setState({
				err: true,
				isLoading: false
			})
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
				<Search search_states = {this.state} onSearch={this.handle_search}/>
				</div>  

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>   

				<div className="collapse navbar-collapse col-md-auto col-lg-4" id="navbarSupportedContent">
					<ul className="navbar-nav navbar-right">
						<li className="nav-item"><a href="home.html">Home</a></li>
						<li className="nav-item"><a href="home.html">About us</a></li>
						<li className="nav-item"><a href="google_api_test.html">Contact us</a></li>
						<li className="nav-item"><a href="home.html">Sign up / Sign in</a></li>
					</ul>
				</div>
				<div className= "col-xs-0 col-md-0 col-lg-1"></div>
			</nav>  

			<div id="root"></div>
			<App courses = {this.state.courses}/>
			</div>

		
		)   
	}
}

export default MainBoard;