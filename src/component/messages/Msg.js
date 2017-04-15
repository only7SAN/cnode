import React, { Component, PropTypes } from 'react';
import NotReadMsg from './notReadMsg';
import ReadMsg from './readMsg';

//未读消息
class Msg extends Component{

	render(){
		let { hasnot_read_msg ,has_read_msg , count} = this.props;

		return (
			<div className="msg page-middle">
				<NotReadMsg msg={ hasnot_read_msg } count={ count } />
				<ReadMsg msg={ has_read_msg } />
			</div>
			);
	}
}

export default Msg;