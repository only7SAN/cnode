import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import  ReactIScroll from 'react-iscroll';
import  iScroll from 'iscroll';
import ToTop from './toTop';
import { Tool } from '../../tool';
import { DataLoad } from '../index';

//主题列表
class List extends Component{
	constructor(props) {
		super(props);


		this.state = { toTop:"to-top-false" };

        this.onScrollEnd = (iScrollInstance) =>{
        	if(iScrollInstance.y - Number.parseInt(iScrollInstance.maxScrollY) <= 50){
        		this.props.append();
        	}else if( iScrollInstance.y >= 0){
        		this.props.refresh();
        	}else if( iScrollInstance.y <= -320){
        		this.appear();
        	}else if( iScrollInstance.y >= -320){
        		this.disappear();
        	}
        };

        this.appear = () =>{
        	this.setState({toTop:"to-top-true"});
        }
        this.disappear = () =>{
        	this.setState({toTop:"to-top"});
        }

        this.toTop = (e) =>{
        	e.preventDefault()
		    this.iScroll.withIScroll(function(iScroll) {
			    iScroll.scrollTo(0,-1,1000)
		    });
        }

        this.preventTouch = (e) =>{
        	e.preventDefault();
        }
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).addEventListener('touchmove',this.preventTouch, { passive: false });
	}

	render(){

		let main = <DataLoad />;

		return (
			<ReactIScroll   className="iscroll"
							ref={(iScroll) =>{
								this.iScroll = iScroll
							}}
							iScroll={iScroll}
							onBeforeScrollStart={this.onBeforeScrollStart}
	                        options={this.props.options}
	                        onScrollEnd={this.onScrollEnd}
	                        >
				<ul className="index-list">
	                {
	                    this.props.list.map((item, index) => {
	                        return <ListItem key={item.id} {...item} />
	                    })
	                }
	                <li>{ main }</li>
	            </ul>
	            <ToTop toTopClass={ this.state.toTop } toTop={this.toTop} />
	        </ReactIScroll>
            );
	}
}

List.defaultProps = { 
						options: {
					                mouseWheel: true,
					                scrollbars: true,
					                bounce:true
					              }
					 };

class ListItem extends Component{
	constructor(props) {
		super(props);
	}

	render(){	
		let {id, title, author, visit_count, reply_count, create_at, last_reply_at, tab, good, top} = this.props;
		let time = Tool.formatDate(create_at);

		return (
				<li className="index-item">
					<div className="index-item-left">
						<Link to={"/user/" + author.loginname} ><img  src = {author.avatar_url} className="index-item-author-head" /></Link>
						<span className="index-item-loginname">{author.loginname}</span>
					</div>
					<div className="index-item-right">
						<div className="index-item-title-place">
							{ good ? <span className="index-item-good">精</span> : null}
							{ top ? <span className="index-item-top">置顶</span> : null}
							<Link to={"/topic/" + id} className="index-item-title">{title}</Link>
						</div>
						<span className="index-item-time">{time}</span>
						<span className="index-item-count">浏览：{visit_count}  回复：{reply_count}</span>
					</div>
					<br/>
				</li>
			);
	}
}

export default List;