import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action';
import { TopicHeader ,Content , Reply } from '../component/topicDetail';
import { DataLoad ,DataNull , Header } from '../component';

//文章详情页
class TopicDetail extends React.Component {
    componentDidMount() {
        let { User,actions } = this.props;
        let location = this.props.location;

        if(User){
            actions.fetchData({
                component:"TopicDetail",
                prefix:"TOPICDETAIL/",
                url:`/api/v1/${location.pathname}`,
                data:{
                    accesstoken:User.accesstoken,
                    mdrender:true
                }
            })
        }else{
            actions.fetchData({
                component:"TopicDetail",
                prefix:"TOPICDETAIL/",
                url:`/api/v1/${location.pathname}`,
                data:{
                    mdrender:true
                }
            })
        }
        
    }

    render(){
        let {state,actions} = this.props;
        let {data} = this.props.state,
            User = this.props.User;

        if(state.isFetching){
            return <DataLoad />;
        }else{
            if(data){
                 var { id, title, author, visit_count , content , replies , reply_count, create_at, last_reply_at} = data;
                return (
                    <div className="topic-detail-page">
                        <Header title={"CNode"} />
                        <div className="topic-detail">
                            <TopicHeader data = {data} User={User} actions={{postData:actions.postData}}/>
                            <Content content = {content} />
                            <Reply replies={replies} User={User} topic_id={id} actions={{postData:actions.postData}} />
                        </div>
                    </div>
                    );
            }else{
                return <DataNull />
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { User,actions } = this.props;
        let location = this.props.location;
        
        if(nextProps.location.key != this.props.location.key){
           if(User){
                actions.fetchData({
                    component:"TopicDetail",
                    prefix:"TOPICDETAIL/",
                    url:`/api/v1/${location.pathname}`,
                    data:{
                        accesstoken:User.accesstoken,
                        mdrender:true
                    }
                })
            }else{
                actions.fetchData({
                    component:"TopicDetail",
                    prefix:"TOPICDETAIL/",
                    url:`/api/v1/${location.pathname}`,
                    data:{
                        mdrender:true
                    }
                })
            }
        }
        return nextProps != this.props;
    }

    componentWillReceiveProps(nextProps) {
 
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