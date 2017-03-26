import React, { Component, PropTypes } from 'react';
import UserMsg from './userMsg';
import UserTopic from './userTopic';
import UserReply from './userReply';
import UserCollection from './userCollection';


//用户信息
class UserDetail extends Component{
	
	render(){

		let { loginname , avatar_url , score , create_at , collections ,recent_replies , recent_topics } = this.props.data;
		let collect = collections ? <UserCollection collections={collections} /> :null;
		return (
			<div className="user-detail">
				<UserMsg data={this.props.data} />
				<UserTopic topics={recent_topics} />
				<UserReply replies={recent_replies} />
				{ collect }
			</div>
			);
	}
}

export default UserDetail;