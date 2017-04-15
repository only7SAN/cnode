import React, { Component, PropTypes } from 'react';
import {Tool} from '../../tool';

//回复框
class ReplyContainer extends Component{
	constructor(props) {
		super(props);
		this.reply = this.reply.bind(this);
	}

	reply(){
		let { User, id, reply_id, topic_id, author, actions } = this.props;
		let replyData={},
			that = this;

		if(User){
			replyData.accesstoken = User.accesstoken;

			if(this.refs.replyContent.value == ''){
				swal({
					  title: "评论不能为空",
					  type: "error",
					  confirmButtonText: "确认"
					});
				return this.refs.replyContent.focus();
			}else if(this.refs.replyContent.value.length <= 5){
				swal({
					  title: "评论字数太短",
					  type: "error",
					  confirmButtonText: "确认"
					});
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
					swal({
					  title: "评论成功",
					  type: "success",
					  confirmButtonText: "确认"
					});
					this.context.router.replace({pathname:`/topic/${topic_id}`});
				},
				fail:() =>{
					swal({
					  title: "评论失败",
					  type: "error",
					  confirmButtonText: "确认"
					});
				}
			})
		}else{
			this.context.router.replace({pathname:'/signin'});
		}
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