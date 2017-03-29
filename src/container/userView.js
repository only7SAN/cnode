import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action/actions';
import { Footer, UserDetail , SignOut } from '../component/userView';

//用户页面
class UserView extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props.state;
    }

    componentDidMount(){
    	let { actions,params } = this.props;
    	let location = this.props.location;

    	actions.fetchData({
            component:"UserView",
            prefix:"USERVIEW/",
    		url:`/api/v1/user/${params.loginname}`,
            data:{}
    	})

        actions.fetchData({
            component:"UserView",
            prefix:"USERCOLLECTION/",
            url:`/api/v1/topic_collect/${params.loginname}`,
            data:{}
        })
    }

	render(){
        console.log(this.props);
		var { data } = this.props.state;
        var { User, params } = this.props;
        var main = data ? <UserDetail data={data}  /> : null;

		return (
			<div className='user-view'>
				{ User ? <SignOut /> : null }
				{main}
				<Footer index="3" User={User} />
			</div>
			)
	}
}

UserView.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) =>{
    return {
    	state:state.UserView,
    	User:state.User
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(UserView);