import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetNextPage } from './common/index';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			button:'登录'
		}

		this.signIn = () =>{
			var accesstoken = this.refs.text.value;
			if(!accesstoken){
				return alert('请输入accesstoken');
			}
			this.setState({button:'努力登录中'});
			Tool.post('/api/v1/accesstoken',{ accesstoken },(res) =>{
				if(res.success){
					alert('您已成功登录');
					res.accesstoken = accesstoken;
					this.props.signin(res);
					this.context.router.push({
						pathname:'/user/' + res.loginname
					})
				}else{
					alert('登陆失败');
					this.setState({button:'登陆失败'});
				}
			},() =>{
					alert('登陆失败');
					this.setState({button:'登陆失败'});
			})
		}
	}
	render(){
 		return (
			<div className="form-signIn">
				<div className="signIn-title">登陆窗口</div>
				<input type="text" placeholder="请输入accesstoken" ref='text' />
				<button className="btn" onClick={this.signIn}>{this.state.button}</button>
			</div>
			)
	}
}
SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect((state) => {return {User:state.User} },action('User'))(SignIn);