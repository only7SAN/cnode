import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

//已读消息
class ReadMsg extends Component{

	render(){

		let messages = this.props.msg;
		return (
			<div className="msg-read">
				<h2 className="msg-read-title">已读消息</h2>
				<ul className="msg-read-list">
					{
						messages.map((item,index) => {
							return (
								<li className="msg-read-item messages-item" key={item.id} >
									<Link to={"/user/" + item.author.loginname} >{item.author.loginname}</Link> 回复了你的话题 <Link to={"/topic/" + item.topic.id } >{item.topic.title}</Link>
								</li>
							)
						})
					}
				</ul>
			</div>
			);
	}
}

export default ReadMsg;