import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action/actions';
import {Footer , NotReadMsg , ReadMsg } from '../component/messages';

//信息页面
class Messages extends React.Component {

	componentWillMount() {
		let { actions,params } = this.props;

    	actions.fetchData({
    		prefix:"MESSAGES/",
    		url:`/api/v1/messages`,
            data:{accesstoken:this.props.User.accesstoken,mdrender:true}
    	})

    	actions.fetchData({
    		prefix:"COUNT/",
    		url:"/api/v1/message/count",
    		data:{accesstoken:this.props.User.accesstoken}
    	})
	}

	render(){
		var { data , countData } = this.props.state;
        var { User, params } = this.props;
        var main = null;
		if (!User) {
            this.context.router.replace({ pathname:'/signin'});
   		}

		return (
			<div className="messages">
				{
					data ? <NotReadMsg msg={data.hasnot_read_messages} User = {User} count = { countData } /> : null
				}
				{
					data ? <ReadMsg msg={data.has_read_messages} /> : null
				}
				<Footer index="2" User={User} />
			</div>
			)
	}
}

Messages.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {
    	state:state.Messages,
    	User:state.User
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(Messages);