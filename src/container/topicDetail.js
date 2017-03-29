import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action/actions';
import { TopicHeader ,DataLoad ,DataNull , Content , Reply } from '../component/topicDetail';

//文章详情页
class TopicDetail extends React.Component {
    componentDidMount() {
        let { User,actions } = this.props;
        let location = this.props.location;

        actions.fetchData({
            component:"TopicDetail",
            prefix:"TOPICDETAIL/",
            url:`/api/v1/${location.pathname}`,
            data:{
                accesstoken:User.accesstoken,
                mdrender:true
            }
        })
    }

    render(){

        let {state,actions} = this.props;
        
        var {data} = this.props.state,
            User = this.props.User;
            console.log(this.props);

        if(data){
            var { id, title, author, visit_count , content , replies , reply_count, create_at, last_reply_at} = data;
            return (
                <div className="topic-detail">
                    <TopicHeader data = {data} User={User} actions={{postData:actions.postData}}/>
                    <Content content = {content} />
                    <Reply replies={replies} User={User} topic_id={id} actions={{postData:actions.postData}} />
                </div>);
        }else{
            if(state.isFetching){
                return <DataLoad />;
            }else{
                return <DataNull />;
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != nextState;
    }
}

TopicDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {state:state.TopicDetail,User:state.User}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(TopicDetail);