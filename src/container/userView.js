import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action';
import { UserDetail } from '../component/userView';
import { Footer,  Header ,DataLoad ,DataNull} from '../component';

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
            success:() =>{
                actions.fetchData({
                    component:"UserView",
                    prefix:"USERCOLLECTION/",
                    url:`/api/v1/topic_collect/${params.loginname}`
                })
            }
    	})
    }

	render(){
		let { data ,isColFetching } = this.props.state;
        let { User, params } = this.props;
        console.log(isColFetching)
        let main;
        if(isColFetching === false){
            console.log(data)
            if(data){
                main = <UserDetail data={data} User={User}  />;
            }else{
                main = <DataNull />;
            }
        }else{
            main = <DataLoad />;
        }

		return (
			<div className='user-view'>
                <Header title="个人中心" />
                <div className="page-middle">
				    {main}
                </div>
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