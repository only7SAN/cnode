import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../action/actions';
import TigMsgSignIn from '../component/signIn';
import { Tool } from '../tool';

//登录页面
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("hellodisup");
				//用户信息记录
		if(this.props.state.data){
			this.props.actions.userSignIn(Object.assign({},{accesstoken:this.refs.text.value},this.props.state.data));
		}

		if(this.props.User){
			this.context.router.replace({pathname:`/user/${this.props.User.loginname}`})
		}


	}


	signIn(){
		let { state,actions } = this.props;
		let postData = {};

		postData.accesstoken = this.refs.text.value;

		//post请求获得用户信息
		actions.postData({
			component:"SignIn",
			prefix:"SIGNIN/",
			url:"/api/v1/accesstoken",
			data:postData
		});
		
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("should")
		return nextProps.state != this.props.state || nextProps.User != this.props.User; 
	}

	render(){
		
 		return (
			<div className="form-signIn">
				<div className="signIn-title">登陆窗口</div>
				<TigMsgSignIn />
				<input className="signIn-input" type="text" placeholder="请输入accesstoken" ref='text' />
				<button className="signIn-btn" onClick={this.signIn}>登录</button>
			</div>
			)
	}
}
SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {state:state.SignIn,User:state.User}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(SignIn);