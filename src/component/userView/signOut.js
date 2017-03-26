import React, { Component, PropTypes } from 'react';

//注销按钮
class SignOut extends Component{
	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
	}

	signOut(){
		this.context.router.push('/signout');
	}

	render(){
		return (
			<button className="signOut-btn" onClick={ this.signOut } value="退出登录" >退出登录</button>
			)
	}
}

SignOut.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignOut;