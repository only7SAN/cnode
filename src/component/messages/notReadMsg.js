import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { Tool } from '../../tool';

//未读消息
class NotReadMsg extends Component{
	constructor(props) {
			super(props);
		}

	render(){
		let messages = this.props.msg;

		return (
			<div className="msg-not-read">
				<h2 className="msg-not-read-title">未读消息 ({this.props.count})</h2>
				<ul className="msg-not-read-list">
					{
						messages.map((item,index) => {
							return (
								<li className="msg-not-read-item" key={item.id} >
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

export default NotReadMsg;