import React, { Component, PropTypes } from 'react';

//文章内容，将md转化为html渲染（dangerouslySetInnerHTML）
class Content extends Component{

	componentDidMount() {
	}

	render(){

		var content = this.props.content;

		const createMarkup = () => {
			return {
				__html:content
			}
		}

		return (
			<div className="topic-content">
				<div id="content" className="content markdown-body" dangerouslySetInnerHTML = {createMarkup()} />
			</div>
			)
	}
}

export default Content;