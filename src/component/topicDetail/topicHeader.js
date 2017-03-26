import React, { Component, PropTypes } from 'react';
import Collection from './collection';
import { Tool } from '../../tool';

//文章头部信息（包括标题，作者，发布时间等等)
class TopicHeader extends Component{

	render(){
		var {id, title, author, visit_count, content , reply_count, create_at, last_reply_at , is_collect} = this.props.data;
		var { User,actions } = this.props;
		let collect = User ? <Collection is_collect={is_collect} topic_id={id} User={User} actions = {actions} /> : null;

		return (
			<div className="topic-header">
				<h1 className="topic-header-title">{title}</h1>
				<ul className="topic-header-list">
					<li>发布时间: {Tool.formatDate(create_at)}</li>
					<li>作者: {author.loginname} </li>
					<li>浏览: {visit_count}</li>
					<li>回复: {reply_count}</li>
				</ul>
				{ collect }
			</div>
			);
	}
}

export default TopicHeader;