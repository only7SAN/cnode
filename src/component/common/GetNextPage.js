import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import action from '../../action'
import { connect } from 'react-redux';
import {Tool,merged} from '../../tool';
import {DataLoad,Header,Footer,UserHeadImg,TigMsgSignIn,DataNull} from './index';

import GetNextPage from 'get-next-page';

const target = 'https://cnodejs.org';

const Main = (mysettings) =>{

	const settings = {
		id:'',
		type:'GET',
		url:'',
		data:null,
		component:<div></div>,
		success:(state) => {return state;},
		error:(state) => {return state;}
	}

	for(let attr in mysettings){
		settings[attr] = mysettings[attr];
	}

	class Index extends Component{
		constructor(props) {
			super(props);

			this.initState = (props) =>{
				var {state,location} = props;
				var {pathname,search} = location;
				this.path = pathname + search;

				if(typeof this.action == 'undefined' && location.action == 'PUSH'){
					this.action = false;
				}else{
					this.action = true;
				}

				if(typeof state.path[this.path] === 'object' && state.path[this.path] == this.path && this.action){
					this.state = state.path[this.path];
				}else{
					this.state = merged(state.defaults);
					this.state.path = this.path;
					this.action = false;
				}
			}

			this.readyDOM = () =>{
				var {success,error} = this.props.settings;
				var {scrollX,scrollY} = this.state;
				if(this.get){return false};
				window.scrollTo(scrollX,scrollY);
				this.get = new GetNextPage(this.refs.dataLoad,{
					url:target + this.getUrl(),
					data:this.getData(),
					start:this.start,
					load:this.load,
					error:this.error
				})
			}

			this.start = () =>{
				this.state.loadAnimate = true;
				this.state.loadMessage = "努力加载中。。。";
				this.setState(this.state);
			}

			this.load = (res) =>{
				var {state} = this;
				var {data} = res;
				if (!data.length && data.length < before.limit) {
                    state.nextBtn = false;
                    state.loadMessage = '没有了';
                } else {
                    state.nextBtn = true;
                    state.loadMessage = '上拉加载更多';
                }
                Array.prototype.push.apply(state.data, data);
                state.loadAnimate = false;
                state.page = ++state.page;
                this.setState(state);
			}

			this.error = () =>{
				this.state.loadAnimate = false;
				this.state.loadMessage = "加载失败";
				this.setState(this.state);
			}
			
			this.unmount = () =>{
				this.get.end();
				delete this.get;
				delete this.action;
				this.state.ScrollX = window.scrollX;
				this.state.ScrollY = window.scrollY;
				this.setState(this.state);
			}

			//获得Url
			this.getUrl = () =>{
				var {url} = this.props.settings;
				if(typeof url === 'function'){
					return url(this.props,this.state);
				}else if(url && typeof url === 'string'){
					return url;
				}else{
					return this.props.location.pathname;
				}
			}

			//获得数据
			this.getData = () =>{
				var {data} = this.props.settings;
				if(typeof data === 'function'){
					return data(this.props,this.state);
				}else if(data && typeof data === 'string'){
					return data;
				}else{
					return this.props.location.query;
				}
			}


			this.initState(this.props);
		}

		render(){

			var { loadAnimate,loadMessage} = this.state;
			return (
					<div>
						<this.props.settings.component {...this.props} state = {this.state} />
						<div ref="dataLoad" ><DataLoad loadAnimate={loadAnimate} loadMessage={loadMessage} /></div>
					</div>
				);
		}

		componentDidMount() {
			this.readyDOM();
		}

		componentWillReceiveProps(nextProps) {
			var {location} = nextProps;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }

            this.initState(nextProps);
            this.setState(this.state);
		}

		shouldComponentUpdate(nextProps, nextState) {
			return true;
		}

		componentDidUpdate() {
			this.readyDOM();
		}

		componentWillUnmount() {
			this.unmount();
		}
	}

	Index.defaultProps = {settings};

	return connect((state) => { return { state: state[settings.id], User: state.User } }, action(action.id))(Index);
}

export default Main;