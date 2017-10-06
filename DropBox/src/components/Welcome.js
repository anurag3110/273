import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class Welcome extends Component {

	static propTypes = {
		username: PropTypes.string.isRequired
	};

	state = {
		username : ''
	};

	componentWillMount(){
		console.log('' === this.props.username);
		this.setState({
			username : this.props.username
		});
		//document.title = `Welcome, ${this.state.username} !!`;
	}

	componentDidMount(){
		document.title = `Welcome, ${this.state.username}!`;
	}

	render(){
		return(
			<div className="row" id="welcomeRow">
				<div className="col-md-2" id="navBar">
					<img src="/Images/DropBox.svg" id="imageDropBox"></img>
				</div>

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
