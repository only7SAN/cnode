import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

//主题分类导航
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

export default Nav;