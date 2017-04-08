import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

//用户最近评论
class UserReply extends Component{

	render(){

		let replies = this.props.replies;

		return (
			<div className="user-replies">
				<h2 className="user-replies-title userview-title">最近评论过的主题</h2>
				<ul className="user-replies-list">
					{replies.map((item,index) => {
						return <UserReplyItem key={item.id}  {...item} />
					})}
				</ul>
			</div>
			);
	}
}

class UserReplyItem extends Component{

	render(){

		let {title , id} = this.props;

		return (
			<Link to={"/topic/" + id} >
				<li className="user-replies-item userview-item">{title}</li>
			</Link>
			);
	}
}

export default UserReply;