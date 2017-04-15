import React, { Component, PropTypes } from 'react';

//回到顶部
class ToTop extends Component{
	
	render(){
		let { toTopClass, toTop } = this.props;

		return (
			<div className={'iconfont to-top ' + toTopClass} onClick={ toTop } >
				&#xe617;
			</div>
		)
	}

}

export default ToTop;