import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetNextPage } from './common/index';

class SignOut extends React.Component {

	constructor(props) {
		super(props);
		
		this.signOut = () =>{
			this.props.signout();
			this.context.router.replace({pathname:'/'})
		}
	}

	render(){
		return (
			<div className="form-signOut">
				<h2>退出页面</h2>
				<button onClick={this.signOut}>确认退出？</button>
			</div>
			)
	}
}

export default connect((state) => {return {User:state.User} },action('User'))(SignOut);