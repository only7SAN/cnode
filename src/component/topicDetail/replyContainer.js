import React, { Component, PropTypes } from 'react';
import {Tool} from '../../Tool';

//回复框
class ReplyContainer extends Component{
	constructor(props) {
		super(props);
		this.reply = this.reply.bind(this);
	}

	componentDidMount() {
		if(this.props.id){
			this.refs.replyContent.value = "@" + this.props.author.loginname + " ";
		}
	}

	reply(){
		let { User,id,reply_id,topic_id,author,actions } = this.props;
		let replyData={},
			that = this;
		replyData.accesstoken = User.accesstoken;
		replyData.content = this.refs.replyContent.value;
		replyData.reply_id = id;

		actions.postData({
			component:"TopicDetail",
			prefix:"REPLY/",
			url:`/api/v1/topic/${topic_id}/replies`,
			data:replyData,
			success:() =>{
				this.context.router.replace({pathname:`/topic/{topic_id}`});
			}
		})
	}

	render(){
		let { display,author} = this.props;
		return (
			<div className="reply-area" style={{display:display}}>
				<textarea className="reply-area-content" ref="replyContent" />
				<button className="reply-area-btn" onClick={this.reply} >回复</button>
			</div>
			)
	}
}

ReplyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReplyContainer;