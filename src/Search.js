import React, { Component } from 'react';
import './index.css';

class Search extends Component{
	constructor(props){
		super(props)
		this.state = {
			search_val: "NONE"
		}
	}

	search(){
		var search_value = document.getElementById('input_value').value;
		if (search_value === ""){
			search_value = "NONE";
		}
		console.log(search_value)
		this.setState({
			search_val: search_value
		});

		console.log(this.state.search_val)
		
	}

	render(){
		return(
			<form className="input-group-btn form-inline col-md-12 w-100 col-lg-10 offset-lg-2">
            <div className="input-group" id="searchbar">
            	<input className="form-control" id="input_value" type="text" placeholder="Search Course Name, Instructor, or Keywords..." aria-label="Search"/>
            	<div className="input-group-append">
            	<button className="btn btn-light" type='button' onClick={(event)=>this.search(event)}>
            		<i className="fas fa-search"></i>
                </button>
            	</div>
            </div>
        	</form>
		)
	}
}

export default Search;
