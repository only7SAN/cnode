import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action';
import { Msg , ReadMsg } from '../component/messages';
import { Footer,Header } from '../component';

//信息页面
class Messages extends React.Component {
    constructor(props) {
        super(props);
        let { actions } = this.props;

        this.count = () =>{
            actions.fetchData({
            component:"Messages",
            prefix:"COUNT/",
            url:"/api/v1/message/count",
            data:{accesstoken:this.props.User.accesstoken}
               })
        }
        this.count = this.count.bind(this);
    }

    componentWillMount() {
        let { User } = this.props;
        if(!User){ 
            this.context.router.replace({pathname:'/signin'});
        }
    }

	componentDidMount(){
		let { User ,actions } = this.props;

        if(User){
            actions.fetchData({
                component:"Messages",
                prefix:"MESSAGES/",
                url:`/api/v1/messages`,
                data:{accesstoken:this.props.User.accesstoken,mdrender:true}
            })

            setTimeout(this.count,1000);
        }
	}

	render(){

        let { User } = this.props;
		let { data , countData } = this.props.state;

		return (
			<div className="messages">
                <Header title={"消息通知"} />
				{
					data ? <Msg hasnot_read_msg={data.hasnot_read_messages} has_read_msg={data.has_read_messages}  count = { countData } /> : null
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