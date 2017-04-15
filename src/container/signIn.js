import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../action';
import { TigMsgSignIn } from '../component/signIn';
import { Footer, Header } from '../component/index';
import { Tool } from '../tool';

//登录页面
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		//用户信息记录
		if(this.props.User){
			this.context.router.replace({pathname:`/user/${this.props.User.loginname}`})
		}
	}

	signIn(){
		let { state,actions } = this.props;
		let postData = {};

		if(this.refs.text.value == ''){
			swal({
					  title: "accesstoken不能为空",
					  type: "error",
					  confirmButtonText: "确认"
					});
			return this.refs.text.value.focus();
		}else{
			postData.accesstoken = this.refs.text.value.trim();
		}
		
		//post请求获得用户信息
		actions.postData({
			component:"SignIn",
			prefix:"SIGNIN/",
			url:"/api/v1/accesstoken",
			data:postData,
			success:(res) =>{
				swal({
					  title: "登录成功",
					  type: "success",
					  confirmButtonText: "确认"
					});
				actions.userSignIn(Object.assign({},{accesstoken:this.refs.text.value},res));
			},
			fail:() =>{
				swal({
					  title: "请输入正确的accesstoken",
					  type: "error",
					  confirmButtonText: "确认"
					});
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
				<div className="page-middle">
					<input className="signIn-input" type="text" placeholder="请输入accesstoken" ref='text' />
					<button className="signIn-btn" onClick={this.signIn}>登录</button>
				</div>
				<Footer User={ this.props.User } />
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