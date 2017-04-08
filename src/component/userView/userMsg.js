import React, { Component, PropTypes } from 'react';
import SignOut from './signOut';

//用户信息
class UserMsg extends Component{

	render(){

		let {data,User }= this.props;

		return (
			<div className="user-msg">
				<h2 className="user-msg-title userview-title">用户信息</h2>
				<img className="user-msg-head" src={data.avatar_url} />
				<div className="user-msg-right">
					<h3 className="user-msg-loginname">用户名:{data.loginname}</h3>
					<span className="user-msg-score">积分：{data.score}</span>
				</div>
				{User ? <SignOut /> : null }
			</div>
			);
	}
}

export default UserMsg;