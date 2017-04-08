import React, { Component, PropTypes } from 'react';
import { Tool } from '../../tool';

//新建内容表单
class Topic extends Component{

	constructor(props) {
		super(props);

		 this.sub = () =>{

		 	let { actions } = this.props;
		 	let that = this;
		 	var topicData = {};

			topicData.title = this.refs.topicTitle.value;
		    topicData.tab = this.refs.topicTab.value;
		    topicData.content = this.refs.topicText.value;
		    topicData.accesstoken = this.props.User.accesstoken;
		    console.log(topicData);
		 	
		 	actions.postData({
		 		component:"TopicNew",
		 		prefix:"TOPICNEW/",
		 		url:"/api/v1/topics",
		 		data:topicData,
		 		success:function(res){
		 			that.context.router.replace({pathname:`/topic/${res.topic_id}`})
		 		},
		 		fail:function(){
		 			alert("发表失败");
		 		}
		 	})
		 }
	}

	render(){
		return (
			<div className="topic-new">
				<label className="topic-new-label">标题:</label><br/>
				<input className="topic-new-title" ref="topicTitle" type="text" placeholder="请输入标题" /><br/>
				<label className="topic-new-label">类型:</label><br/>
				<select className="topic-new-tab" ref="topicTab">
					<option value="">请选择发布内容</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
				</select><br/>
				<label className="topic-new-label">内容:</label><br/>
				<textarea className="topic-new-content" ref="topicText" cols="40" rows="8" placeholder="请输入主题内容"></textarea><br/>
				<button className="topic-new-button" ref="sub" onClick={this.sub}>发布</button>
			</div>
			)
	}
}

Topic.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Topic;