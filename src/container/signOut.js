import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../action/actions';

//退出页面
class SignOut extends React.Component {

	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
	}

	signOut(){
		let { actions } = this.props;
		actions.userSignOut();
		console.log(localStorage);
		console.log(this.props.User);
		this.context.router.replace({pathname:'/'});
	}

	render(){
		let { state,actions } = this.props;
		return (
			<div className="form-signOut">
				<h2>退出页面</h2>
				<button onClick={this.signOut}>确认退出？</button>
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