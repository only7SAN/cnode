import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import  ReactIScroll from 'react-iscroll';
import  iScroll from 'iscroll';
import { Tool } from '../../tool';

//主题列表
class List extends Component{
	constructor(props) {
		super(props);

        this.onScrollEnd = (iScrollInstance) =>{
        	if(iScrollInstance.y < Number.parseInt((iScrollInstance.maxScrollY) / 3 *2)){
        		this.props.append();
        	}else if( iScrollInstance.y >= 0){
        		this.props.refresh();
        	}
        };
	}

	render(){
		return (
			<ReactIScroll className="iscroll" iScroll={iScroll}
                      options={this.props.options}
                      onScrollEnd={this.onScrollEnd}>
				<ul className="index-list">
	                {
	                    this.props.list.map((item, index) => {
	                        return <ListItem key={item.id} {...item} />
	                    })
	                }
	            </ul>
	        </ReactIScroll>
            );
	}
}

List.defaultProps = { 
						options: {
					                mouseWheel: true,
					                scrollbars: true
					              }
					 };

class ListItem extends Component{
	constructor(props) {
		super(props);
	}

	render(){	
		let {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
		let time = Tool.formatDate(create_at);

		return (
				<li className="index-item">
					<div className="index-item-left">
						<Link to={"/user/" + author.loginname} ><img  src = {author.avatar_url} className="index-item-author-head" /></Link>
						<span className="index-item-loginname">{author.loginname}</span>
					</div>
					<div className="index-item-right">
						<Link to={"/topic/" + id} className="index-item-title">{title}</Link>
						<span className="index-item-time">{time}</span>
						<span className="index-item-count">浏览：{visit_count}  回复：{reply_count}</span>
					</div>
					<br/>
				</li>
			);
	}
}

export default List;