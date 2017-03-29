import React,{Component,PropType} from 'react';
import {Route,Link,Router,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import action from '../action/index';
import {Tool} from '../tool';

class DataLoad extends Component{
	render(){
		let {loadAnimate,loadMessage} = this.props;
		return (
				<div className={"data-load data-load-" + {loadAnimate}}>
					<div className="load-msg">{loadMessage}</div>
				</div>
			);
	}
}
DataLoad.defaultProps = {
	loadAnimate:true,
	loadMessage:"正在加载中"
}

class DataRefresh extends Component{
	render(){
		let {loadAnimate,loadMessage} = this.props;
		return (
				<div className={"data-load data-load-" + {loadAnimate}}>
					<div className="load-msg">{loadMessage}</div>
				</div>
			);
	}
}
DataRefresh.defaultProps = {
	loadAnimate:true,
	loadMessage:"正在刷新"
}


class Header extends Component{
	render(){
		return (
				<header className="header">
					<div className="nav-left">左</div>
					<h2 className="nav-title">cnode</h2>
					<div className="nav-right">右</div>
				</header>
			);
	}
}

class DataNull extends Component{
	render(){
		return (
				<div className="data-null">暂无数据</div>
			);
	}
}

class Footer extends Component{
	
	render(){
		var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
	    var arr = [];
	    arr[this.props.index] = 'on';

		return (
			<footer className="footer">
				<ul className="footer-menu">
					<li>
						<Link to="/">首页</Link>
					</li>
					<li>
						<Link to="/topic/create">发表</Link>
					</li>
					<li>
						<Link to="/my/messages">消息</Link>
					</li>
					<li>
						<Link to={myUrl}>我的</Link>
					</li>
				</ul>
			</footer>
		);
	}
}

class TigMsgSignIn extends Component{
	render(){
		return (
			<div className="tip-msg-signin">
                你还未登录，请先 <Link to="/signIn">登录</Link>
            </div>
		);
	}
}

class UserHeadImg extends Component{
	render(){
		return (
			<div className="user-head">头像</div>
		);
	}
}

export {DataLoad,DataRefresh,Header,Footer,UserHeadImg,TigMsgSignIn,DataNull}