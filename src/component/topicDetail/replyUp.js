import React, { Component, PropTypes } from 'react';
import {Tool} from '../../tool';

//点赞按钮
class ReplyUp extends Component{
	constructor(props) {
		super(props);
		this.state = {color:"black"};
		this.up = this.up.bind(this);
	}

	componentDidMount() {
		if(this.props.is_uped){
			this.setState({color:"red"});
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
			prefix:"REPLYUP/",
			url:`/api/v1/reply/${reply_id}/ups`,
			data:replyUpData,
			success:(res) => { 
				if(res.action == "down"){
					this.setState({color:"red"});
				}else if(res.action == "up"){
					this.setState({color:"black"});
				} else{
					this.setState({color:"black"});
				}
			},
			fail:() => {alert("点赞失败")}
		})
	}

	render(){
		return (
			<button className="reply-up" onClick={this.up} style={{color:this.state.color}}  >点赞</button>
			)
	}
}

export default ReplyUp;