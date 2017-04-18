import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../action';
import { Header,Footer  } from '../component';

//退出页面
class SignOut extends React.Component {

	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
		this.disSignOut = this.disSignOut.bind(this);
	}

	signOut(){
		let { actions } = this.props;
		actions.userSignOut();
		this.context.router.replace({pathname:'/'});
		swal({
			  title: "成功退出",
			  type: "success",
			  confirmButtonText: "确认"
			});
	}

	disSignOut(){
		this.context.router.goBack();
	}

	render(){
		let { state,actions } = this.props;
		return (
			<div className="form-signOut">
				<Header title={"退出页面"} />	
				<div className="page-middle">
					<div className="signout-msg">是否确认退出当前用户？</div>
					<div className="signout-btn">
						<button className="signout-yes" onClick={this.signOut}>确认</button>
						<button className="signout-no" onClick={this.disSignOut}>取消</button>
					</div>
				</div>
				<Footer User={this.props.User} />
			</div>
			)
	}
}

SignOut.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {User:state.User}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(SignOut);