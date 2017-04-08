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
			<div className="user-msg-signout iconfont" onClick={ this.signOut } >&#xe631;</div>
			)
	}
}

SignOut.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignOut;