import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../action/actions';
import {TigMsgSignIn,Footer,Header} from '../component/signIn';
import { Tool } from '../tool';

//登录页面
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props);
		//用户信息记录
		if(this.props.User){
			this.context.router.replace({pathname:`/user/${this.props.User.loginname}`})
		}
	}

	signIn(){
		let { state,actions } = this.props;
		let postData = {};
		let that = this;

		postData.accesstoken = this.refs.text.value.trim();

		//post请求获得用户信息
		actions.postData({
			component:"SignIn",
			prefix:"SIGNIN/",
			url:"/api/v1/accesstoken",
			data:postData,
			success:function(res){
				actions.userSignIn(Object.assign({},{accesstoken:that.refs.text.value},res));
			},
			fail:function(){
				alert("请输入正确的accesstoken");
			}
		});
		
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.state != this.props.state || nextProps.User != this.props.User; 
	}

	render(){
		
 		return (
			<div className="form-signIn">
				<Header title={"登录页面"} />
				<TigMsgSignIn />
				<input className="signIn-input" type="text" placeholder="请输入accesstoken" ref='text' />
				<button className="signIn-btn" onClick={this.signIn}>登录</button>
			</div>
			)
	}
}
SignIn.contextTypes = {
    router: PropTypes.object.isRequired
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