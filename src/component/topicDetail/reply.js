import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import ReplyUp from './replyUp';
import ReplyContainer from './replyContainer';

//回复列表（评论区域）
class Reply extends Component{

	render(){

		let { replies,User,topic_id,actions } = this.props;

		return (
			<div className="reply">
				<h2 className="reply-title">回复列表</h2>
				<ul className="replies">
					{
						replies.map((item ,index) =>{
							return <ReplyList key={item.id} User={User} topic_id={topic_id} actions={ actions } {...item} />
						})
					}
				</ul>
			</div>
			);
	}
}

class ReplyList extends Component{
	constructor(props) {
		super(props);
		this.control = this.control.bind(this);
		this.state={display:"none"}
	}

	control(){
		if(this.state.display == "none"){
			this.state.display = "block"
		}else{
			this.state.display = "none"
		}
		this.setState({display:this.state.display});
	}

	render(){

		let { actions ,author , content , id , create_at , reply_id , is_uped , topic_id , User} = this.props;

		const createMarkup = () =>{
			return {
				__html :content
			}
		}

		return (
			<li className="reply-item">
				<Link to={"/user/" + author.loginname} className="reply-left" >
					<img className = "reply-author-head" src={author.avatar_url} />
				</Link>
				<div className="reply-right">
					<h2 className="reply-author-loginname">{author.loginname}</h2>
					<div className="reply-content markdown-body" dangerouslySetInnerHTML={createMarkup()} />
				</div>
				<ReplyUp id={id} User={User} actions = { actions } is_uped={ is_uped } />
				<button className="reply-area-control" onClick={this.control} >添加评论</button>
				<ReplyContainer display={this.state.display} actions={ actions } {...this.props} />
			</li>
			);
	}
}

export default Reply;