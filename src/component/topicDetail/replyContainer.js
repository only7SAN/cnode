import React, { Component, PropTypes } from 'react';
import {Tool} from '../../Tool';

//回复框
class ReplyContainer extends Component{
	constructor(props) {
		super(props);
		this.reply = this.reply.bind(this);
	}

	reply(){
		let { User,id,reply_id,topic_id,author,actions } = this.props;
		let replyData={},
			that = this;
		replyData.accesstoken = User.accesstoken;

		if(this.refs.replyContent.value == ''){
			alert("评论内容不能为空");
			return this.refs.replyContent.focus();
		}else if(this.refs.replyContent.value.length <= 8){
			alert("评论内容不能少于8个字");
			return this.refs.replyContent.focus();
		}else{
			replyData.content = "@" + this.props.author.loginname + " " + this.refs.replyContent.value;
		}
		replyData.reply_id = id;

		actions.postData({
			component:"TopicDetail",
			prefix:"REPLY/",
			url:`/api/v1/topic/${topic_id}/replies`,
			data:replyData,
			success:() =>{
				this.context.router.replace({pathname:`/topic/${topic_id}`});
			},
			fail:() =>{
				alert("评论失败");
			}
		})
	}

	render(){
		let { display,author} = this.props;
		return (
			<div className="reply-area" style={{display:display}}>
				<textarea className="reply-area-content" ref="replyContent" placeholder={"@" + this.props.author.loginname} />
				<button className="reply-area-btn" onClick={this.reply} >回复</button>
			</div>
			)
	}
}

ReplyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReplyContainer;