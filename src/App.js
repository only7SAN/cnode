require ('./style/style.scss');

import React,{ Component }from 'react';
import ReactDOM,{ render }from 'react-dom';
import { Router,Route,IndexRoute,hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';

import IndexList from './component/indexList';
import TopicDetail from './component/topicDetail';
import TopicNew from './component/topicNew';
import Messages from './component/messages';
import UserView from './component/userview';
import SignIn from './component/signIn';
import SignOut from './component/signOut';

class Root extends Component{
	render(){
		return (
			<div>{this.props.children}</div>
			);
	}
}

render(
	<Provider store={store} >
		<Router history = {hashHistory}>
			<Route path='/' component = {Root}>
				<IndexRoute component = {IndexList} />
				<Route path="topic/create" component = {TopicNew} />
				<Route path="topic/:id" component = {TopicDetail} />
				<Route path="my/messages" component = {Messages} />
				<Route path="user/:loginname" component = {UserView} />
				<Route path="signIn" component = {SignIn} />
				<Route path="signOut" component = {SignOut} />
			</Route>
		</Router>
	</Provider>
	,document.getElementById('app'));