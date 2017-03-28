import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import  ReactIScroll from 'react-iscroll';
import  iScroll from 'iscroll';

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
			<ReactIScroll iScroll={iScroll}
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
		var {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
		return (
				<li className="index-item">
					<Link to={"/topic/" + id} className="index-item-title"><h3>{title}</h3></Link>
					<Link to={"/user/" + author.loginname}><img className="index-item-author-head" src = {author.avatar_url} /></Link>
					<br/>
				</li>
			);
	}

	shouldComponentUpdate(np) {
        return false;
    }
}

export default List;