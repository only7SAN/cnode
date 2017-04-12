import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../action';
import { Topic } from '../component/topicNew';
import { Footer,  Header } from '../component';

//新建文章主题页面
class TopicNew extends Component {
	render(){
		let { state,User,actions } = this.props;
		let main = null;
		if(!User){ 
			this.context.router.replace({pathname:'/signin'});
		}else{
			main = <Topic User = {User} actions = {{ postData : actions.postData }} />
		};
		return (
			<div className="topic-new-page">
				<Header title={"发表主题"} />
				{main}
			</div>
			)
	}
}

TopicNew.contextTypes = {
    router: PropTypes.object.isRequired
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