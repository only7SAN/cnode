import React, { Component, PropTypes } from 'react';

//用户信息
class UserMsg extends Component{

	render(){

		let data = this.props.data;

		return (
			<div className="user-msg">
				<h2 className="user-msg-title">用户信息</h2>
				<img className="user-msg-head" src={data.avatar_url} />
				<h3 className="user-msg-loginname">用户:{data.loginname}</h3>
				<span className="user-msg-score">积分：{data.score}</span>
			</div>
			);
	}
}

export default UserMsg;