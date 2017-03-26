import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../action/actions';
import { Topic } from '../component/topicNew';

//新建文章主题页面
class TopicNew extends Component {
	render(){
		console.log(this.props);
		let { state,User,actions } = this.props;
		let main = null;
		if(!User){ 
			this.context.router.replace({pathname:'/signin'});
		}else{
			main = <Topic User = {User} actions = {{ postData : actions.postData }} />
		};
		if(this.props.state.success){
			this.context.router.replace({pathname:`/topic/${this.props.TopicNew.topic_id}`})
		}
		return (
			<div className="topic-new-page">
				{main}
			</div>
			)
	}
}

TopicNew.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {state:state.TopicNew,User:state.User}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(TopicNew);