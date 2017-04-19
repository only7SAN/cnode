import React,{ Component }from 'react';
import ReactDOM,{ render }from 'react-dom';
import { Router,Route,IndexRoute,hashHistory,browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';

import IndexList from './container/indexList';
import TopicDetail from './container/topicDetail';
import TopicNew from './container/topicNew';
import Messages from './container/messages';
import UserView from './container/userView';
import SignIn from './container/signIn';
import SignOut from './container/signOut';

//加载公共样式
import './style/style.scss';
import './iconfont/iconfont.css';
import 'github-markdown-css';

//加载sweetalert
import 'sweetalert/dist/sweetalert.css'

class Root extends Component{
	render(){
		return (
			<div className="container">{this.props.children}</div>
			);
	}
}

var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

render(
	<Provider store={store} >
		<Router history = {history}>
			<Route path='/' component = {Root}>
				<IndexRoute component = {IndexList} />
				<Route path="topic/create" component = {TopicNew} />
				<Route path="topic/:id" component = {TopicDetail} />
				<Route path="my/messages" component = {Messages} />
				<Route path="user/:loginname" component = {UserView} />
				<Route path="signin" component = {SignIn} />
				<Route path="signout" component = {SignOut} />
			</Route>
		</Router>
	</Provider>
	,document.getElementById('app'));