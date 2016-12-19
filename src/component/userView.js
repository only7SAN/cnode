import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetNextPage,TigMsgSignIn,GetData,Header } from './common/index';

class UserView extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props.state;
		this.tab = (tabIndex) => {
            this.state.tabIndex = tabIndex;
            this.setState(this.state);
        }
    }

	render(){
		var {data, loadAnimate, loadMessage, id, tabIndex} = this.props.state;
        var { User, params} = this.props;
        var main = data ? <Home data={data} tabIndex={tabIndex} tab={this.tab} /> : <DataLoad loadAnimate={loadAnimate} loadMessage={loadMessage} />;
		return (
			<div className='userview'>
				<Header />
				{main}
				<Footer index="3" />
			</div>
			)
	}
}

class Home extends Component{
	
	render(){
		return (<div>2342345</div>);
	}
}

export default GetData({
	id: 'UserView',  //应用关联使用的redux
    component: UserView, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/user/' + props.params.loginname;
    },
    data: {},
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});