import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import action from '../../action';
import { connect } from 'react-redux';
import {Tool,merged} from '../../tool';
import {DataLoad,Header,Footer,UserHeadImg,TigMsgSignIn,DataNull} from './index';

const Main = (mysettings) =>{
	var settings = {
		id:'',
		component:<div></div>,
		type:"GET",
		url:'',
		data:null,
		stop:false,  //true,拦截请求
		success:(state) => { return state},
		error:(state) => { return state}
	}

	for(var attr in mysettings){
		settings[attr] = mysettings[attr];
	}

	class Index extends Component{
		constructor(props) {
			super(props);
			
			//初始化state
			this.initState = (props) => {
				var {state,location} = props;
				var {pathname,search} = location;
				this.path = pathname + search;

				if(typeof state.path[this.path] == 'object' && state.path[this.path].path == this.path){
					 this.state = state.path[this.path];
					}else{
						this.state = merged(state.defaults);
						this.state.path = this.path;
					}
			}

			//初始化DOM
			this.readyDOM = () =>{
				var {success,error} = this.props.settings;
				var {scrollX,scrollY} = this.state;
				if(this.get){return false;} //已经加载过了
				window.scrollTo(scrollX,scrollY);
				if(this.textStop){return false;} //请求被拦截

				this.get = Tool.get(this.getUrl(),this.getData(),(res) =>{
					this.state.loadAnimate = false;
					this.state.loadMessage = '加载成功';
					this.state.data = res.data;
					this.setState(success(this.state) || this.state)
				},(res,xhr) => {
					if (xhr.status == 404) {
                        this.state.loadMessage = '话题不存在';
                    } else {
                        this.state.loadMessage = '加载失败';
                    }
                    this.state.loadAnimate = false;
                    this.setState(error(this.state) || this.state);
				});
			}

			//卸载前的一些操作
			this.unmount = () =>{
				if(typeof this.get == 'undefined'){
					this.get.end();
					delete this.get;
				}
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

			//是否拦截请求
			this.testStop = () =>{
				var {stop} = this.props.settings;
                if (typeof stop === 'function') {
                    return stop(this.props, this.state);
                }
                return stop;
			}

			this.initState(this.props);
		}

		render(){
			return <this.props.settings.component {...this.props} state = {this.state} />
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