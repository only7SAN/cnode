import React, { Component, PropTypes } from 'react';
import {Tool} from '../../tool';

//点赞按钮
class ReplyUp extends Component{
	constructor(props) {
		super(props);
		this.state = {replyStyle:"reply-style-up"};
		this.up = this.up.bind(this);
	}

	componentDidMount() {
		if(this.props.is_uped){
			this.setState({replyStyle:"reply-style-down"});
		}
	}

	up(e){
		let { actions } = this.props;
		e.stopPropagation();
		e.preventDefault();
		let replyUpData = {};
		let reply_id = this.props.id;
		let that = this;
		replyUpData.accesstoken = this.props.User.accesstoken;

		actions.postData({
			component:"TopicDetail",
			prefix:"REPLYUP/",
			url:`/api/v1/reply/${reply_id}/ups`,
			data:replyUpData,
			success:(res) => { 
				if(res.action == "down"){
					this.setState({replyStyle:"reply-style-down"});
				}else if(res.action == "up"){
					this.setState({replyStyle:"reply-style-up"});
				} else{
					this.setState({replyStyle:"reply-style-up"});
				}
			},
			fail:() => {alert("点赞失败")}
		})
	}

	render(){
		return (
			<span className={this.state.replyStyle + " reply-up iconfont"} onClick={this.up} >&#xe60c;</span>
			)
	}
}

export default ReplyUp;