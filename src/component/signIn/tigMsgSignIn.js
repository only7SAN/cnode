import React, { Component, PropTypes } from 'react';

//提示登录
class TigMsgSignIn extends Component{
	render(){
		return (
			<div className="tip-msg-signIn">
                你还未登录，请先 <span className="tip-msg-span">登录</span>
            </div>
		);
	}
}

export default TigMsgSignIn;