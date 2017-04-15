import React,{ Component, PropTypes } from 'react';
import { Route, Link, Router, hashHistory } from 'react-router';
import { Tool } from '../tool';

class DataLoad extends Component{
	render(){
		let {loadAnimate,loadMessage} = this.props;
		return (
				<div className={"data-load data-load-" + {loadAnimate}}>
					<div className="point point-red"></div>
					<div className="point point-green"></div>
					<div className="point point-blue"></div>
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
		let title = this.props.title;
		return (
				<header className="header">
					<div className="nav-back iconfont" onClick={this.context.router.goBack} >&#xe623;</div>
					<span className="nav-title">{title}</span>
				</header>
			);
	}
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
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
	    arr[this.props.index] = 'footer-on';

		return (
			<footer className="footer">
				<ul className="footer-menu">
					<li>
						<Link to="/" className={"iconfont " + arr[0]}>&#xe602;</Link>
					</li>
					<li>
						<Link to="/topic/create" className={"iconfont " + arr[1]}>&#xe60f;</Link>
					</li>
					<li>
						<Link to="/my/messages" className={"iconfont " + arr[2]}>&#xe613;</Link>
					</li>
					<li>
						<Link to={myUrl} className={"iconfont " + arr[3]}>&#x3575;</Link>
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


export { DataLoad, DataNull ,DataRefresh, Header, Footer, TigMsgSignIn }