import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

//主题分类导航
class Nav extends Component{
	
	render(){
		var setCur = {};
		setCur[this.props.tab] = 'tab-on';

		return (
			<ul className='topic-menu'>
				<li className={setCur.all}><Link to='/' className="iconfont">&#xe641;</Link></li>
				<li className={setCur.good}><Link to='/?tab=good' className="iconfont">&#xe6ac;</Link></li>
				<li className={setCur.share}><Link to='/?tab=share' className="iconfont">&#xe62e;</Link></li>
				<li className={setCur.ask}><Link to='/?tab=ask' className="iconfont">&#xe74a;</Link></li>
				<li className={setCur.job}><Link to='/?tab=job' className="iconfont">&#xe501;</Link></li>
			</ul>
		)
	}

	shouldComponentUpdate(nextProps) {
        return this.props.tab !== nextProps.tab; //tab和之前的不一致，组件才需要更新，否则不更新，提升性能
    }
}

export default Nav;