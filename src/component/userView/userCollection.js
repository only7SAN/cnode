import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Tool} from '../../tool';

//收藏文章列表
class UserCollection extends Component{
	constructor(props) {
		super(props);		
	}

	render(){
		return (
			<div className="user-collections">
				<h2 className="user-collections-title userview-title">收藏的主题</h2>
				<ul className="user-collections-list">
					<ul className="user-collections-list">
					{this.props.collections.map((item,index) => {
						return (
							<Link to={"/topic/" + item.id} key={item.id} >
									<li className="user-collections-item userview-item">{item.title}</li>
								</Link>
								)
					})}
				</ul>
				</ul>
			</div>
			)
	}
}

export default UserCollection;