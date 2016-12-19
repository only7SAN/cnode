import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../action/index';
import { Tool, merged } from '../tool';
import { DataLoad,Footer,UserHeadImg,DataNull,GetNextPage } from './common/index';

class Nav extends Component{
	
	render(){
		var setCur = {};
		setCur[this.props.tab] = 'on';

		return (
			<ul className='topic-menu'>
				<li className={setCur.all}><Link to='/'>全部</Link></li>
				<li className={setCur.good}><Link to='/?tab=good'>精品</Link></li>
				<li className={setCur.share}><Link to='/?tab=share'>分享</Link></li>
				<li className={setCur.ask}><Link to='/?tab=ask'>问答</Link></li>
				<li className={setCur.job}><Link to='/?tab=job'>招聘</Link></li>
			</ul>
		)
	}

	shouldComponentUpdate(nextProps) {
        return this.props.tab !== nextProps.tab; //tab和之前的不一致，组件才需要更新，否则不更新，提升性能
    }
}

class List extends Component{

	render(){
		return (
			<ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={item.id} {...item} />
                    })
                }
            </ul>
            );
	}
}

class ListItem extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		var {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
		return (
				<li className="index-item">
					<Link to={"/topic/" + id} className="index-item-title"><h3>题目:{title}</h3></Link>
					<h3 className="index-item-author">作者:{author.loginname}</h3>
					<br/>
				</li>
			);
	}

	shouldComponentUpdate(np) {
        return false;
    }
}

class IndexList extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		var {data, loadAnimate, loadMessage} = this.props.state;
        var tab = this.props.location.query.tab || 'all';

		return (
			<div>
				<Nav tab = {tab} />
				{ data.length > 0 ? <List list={data} /> : null }
				<Footer index='0' User = {this.props.User}/>
			</div>
			)
	}
}

export default GetNextPage({
	id:'IndexList',
	component:IndexList,
	url:'/api/v1/topics',
	data:(props, state) => { //发送给服务器的数据
        var {page, limit, mdrender} = state;
        return {
            tab: props.location.query.tab || 'all',
            page,
            limit,
            mdrender
        }
    },
	success:(state) => {return state;},
	error:(state) => {return state;}
}) ;