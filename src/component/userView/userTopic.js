import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

//用户最近文章
class UserTopic extends Component{

	render(){

		let topics = this.props.topics;

		return (
			<div className="user-topics">
				<h2 className="user-topics-title">最近发表的主题</h2>
				<ul className="user-topics-list">
					{topics.map((item,index) => {
						return <UserTopicItem key={item.id} {...item} />
					})}
				</ul>
			</div>
			);
	}
}

class UserTopicItem extends Component{

	render(){

		let {title , id} = this.props;
		return (
			<Link to={"/topic/" + id} >
				<li className="user-topics-item">{title}</li>
			</Link>
			);
	}
}

export default UserTopic;