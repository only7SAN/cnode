import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetNextPage,GetData } from './common/index';

class TopicDetail extends React.Component {
	render(){

		var {data} = this.props.state;
		var {id, title, author, visit_count, reply_count, create_at, last_reply_at} = data;
		return (
			<div className="topicDetail">
				{ data != '' ? <Detail data={data} /> : null }
			</div>
			)
	}
}

class Detail extends Component{

	componentDidMount() {
		var content = this.props.data.content;
		this.refs.content.innerHTML = content;
	}

	render(){
		console.log(this.props.data);
		var {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props.data;
		return (
			<div className="detail">
				<h1>{title}</h1>
				<p>{author.loginname}</p>
				<time>{create_at}</time>
				<p>访问量：{visit_count}</p>
				<div id="content" ref="content"></div>
			</div>
			)
	}
}

export default GetData({
    id: 'TopicDetail',  //应用关联使用的redux
    component: TopicDetail, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topic/' + (props.params.id || '');
    },
    data: (props, state) => { //发送给服务器的数据
        var accesstoken = props.User ? props.User.accesstoken : '';
        return { mdrender: state.mdrender, accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});