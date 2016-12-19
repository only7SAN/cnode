import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetData,TigMsgSignIn,Header } from './common/index';

class Messages extends React.Component {
	render(){
		var {data, loadAnimation, loadMsg, id, tabIndex} = this.props.state;
        var {User, params} = this.props;
        var main = null;
		if (!User) {
            main = <TigMsgSignIn />
		}
		return (
			<div className="messages">
				<Header />
				{main}
				<Footer />
			</div>
			)
	}
}

export default GetData({
	id:'Messages',
	component:Messages,
	url: '/api/v1/messages',
	stop: (props, state) => {
        return !Boolean(props.User);
    },
	data:(props,state) => {
		return { accesstoken: props.User.accesstoken }
	},
	success:(state) => { return state;},
	error:(state) => { return state;}
});