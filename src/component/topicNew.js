import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetData,TigMsgSignIn,Header } from './common/index';

class TopicNew extends Component {
	render(){
		var User = this.props.User;
		var main = null;
		if(!User){ main = <TigMsgSignIn  /> }else{
			main = <Topic User = {User} />
		};
		return (
			<div className="topicNew">
				{main}
			</div>
			)
	}
}

class Topic extends Component{

	constructor(props) {
		super(props);

		

		 this.sub = () =>{
		 	var topicData = {};
		 	console.log(this.props)
		
			topicData.title = this.refs.topicTitle.value;
		    topicData.tab = this.refs.topicTab.value;
		    topicData.content = this.refs.topicText.value;
		    topicData.accesstoken = this.props.User.accesstoken;
		 	
		 	Tool.post('/api/v1/topics',topicData,(res) =>{
		 		if(res.success){
		 			alert('发布成功');
		 			this.context.router.push('/topic/' + res.topic_id);
		 		}else{
		 			alert('发布失败');
		 		}
		 	},() =>{
		 		alert('发布失败');
		 	})
		 }
	}

	render(){
		return (
			<div className="topicNew">
				<h2>发布新主题</h2>
				<label>标题：</label>
				<input ref="topicTitle" type="text" placeholder="请输入标题" />
				<select ref="topicTab">
					<option value="">请选择发布内容</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
				</select>
				<label>内容</label>
				<textarea ref="topicText" cols="40" rows="8" placeholder="请输入主题内容"></textarea>
				<button ref="sub" onClick={this.sub}>发布</button>
			</div>
			)
	}
}
Topic.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect((state) => { return { User:state.User} })(TopicNew);