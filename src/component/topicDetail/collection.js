import React, { Component, PropTypes } from 'react';
import { Tool } from '../../tool';

//收藏部分
class Collection extends Component{

	constructor(props) {
		super(props);
		this.collect = this.collect.bind(this);
	}

	collect(e){
		e.stopPropagation();
		let collectData = {};
		let topic_id = this.props.id;
		let { actions }= this.props;


		collectData.accesstoken = this.props.User.accesstoken;
		collectData.topic_id = this.props.topic_id;
		console.log(this.props.is_collect);

		if(!this.props.is_collect){
			actions.postData({
				component:"TopicDetail",
				prefix:"COLLECT/",
				url:"/api/v1/topic_collect/collect",
				data:collectData,
				success:() => { return }
			})
		}else{
			actions.postData({
				component:"TopicDetail",
				prefix:"DECOLLECT/",
				url:"/api/v1/topic_collect/de_collect",
				data:collectData,
				success:() => { return }
			})
		}
		
	}

	render(){

		let collect = this.props.is_collect ? <span>已收藏</span> : <span>收藏</span>;

		return (
			<div className="topic-collect" onClick={this.collect} >{collect}</div>
			)
	}
}

export default Collection;