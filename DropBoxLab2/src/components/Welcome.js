import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../API'
import LeftNav from './LeftNav';

class Welcome extends Component {

	static propTypes = {
		username: PropTypes.string.isRequired
	};

	state = {
		username : ''
	};

	componentWillMount(){
		
		this.setState({
			username : this.props.username
		});
		//document.title = `Welcome, ${this.state.username} !!`;
	}

	getUsers = () => {

		API.getUsers(1)
		.then( result => {


			result.forEach( (record) => {
				console.log(record.username);
			});


		});
	};

	getGroups = () => {
		let result1, result2;
		API.getGroups(this.state.username)
		.then( results => {
			result1 = results.result1;
			result2 = results.result2;

			result1.forEach( (record) => {
				console.log(record.groupName);
			});

			result2.forEach( (record) => {
				console.log(record.groupName);
			});
		});
	};

	componentDidMount(){
		document.title = `Welcome, ${this.state.username}!`;
	}

	render(){
		return(
			<div className="row" id="welcomeRow">

				<LeftNav />

				<div className="col-md-10">
					<div className="alert alert-warning" role="alert">
						{this.state.username}, welcome to DropBox!

					</div>
					<Link to="/login">Logout</Link>
				</div>
			</div>
		)
	}
}

export default withRouter(Welcome);
