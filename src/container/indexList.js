import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action';
import { Nav , List } from '../component/indexList';
import { Footer, DataLoad, DataRefresh, DataNull } from '../component/index';

//页面首页主题展示
class IndexList extends Component {
    constructor(props) {
        super(props);
        let { actions } =this.props;
        let tab = this.props.location.query.tab ? this.props.location.query.tab  : 'all' ;

        this.state = ({fetchData:{
            component:"IndexList",
            prefix:"REFRESHINDEXLIST/",
            url:"/api/v1/topics",
            data:{
                page:1,
                limit:10,
                tab:tab,
                mdrender:true
            }
        }})

        this.append = function(){
            this.state.fetchData.prefix = "APPENDINDEXLIST/";
            this.state.fetchData.data.page++;
            actions.fetchData(this.state.fetchData);
            this.setState(this.state);
          }

        this.refresh = function(){
            this.state.fetchData.data.page = 1;
            this.state.fetchData.prefix = "REFRESHINDEXLIST/";
            actions.fetchData(this.state.fetchData);
            this.setState(this.state);
          }

        this.append = this.append.bind(this);
        this.refresh = this.refresh.bind(this);
    }


    componentDidMount() {
        let { actions , state } =this.props;

        actions.fetchData(this.state.fetchData);
    }

    render(){  
        let { state } =this.props,
            { data } = state,
            list;
        
        if( data.length == 0){
            if(state.isFetching){
                list = <DataLoad />;
            }else{
                list = <DataNull />;
            }
        }else{
            if(state.isFetching && state.isRefreshing){
                list = <DataLoad />;
            }else{
               list = <List list={data}  append = {this.append} refresh = { this.refresh } /> ; 
            }    
        }

        return (
            <div className="index">
                <Nav tab={this.state.fetchData.data.tab} />
                <div className="react-iscroll  page-middle" >
                    { list }
                </div>
                <Footer index='0' User = {this.props.User}/>
            </div>
            )
    }

    componentWillReceiveProps(nextProps) {
        let { actions , state } =this.props;
     
        if(nextProps.location.query.tab != this.props.location.query.tab){
            this.state.fetchData.prefix = "REFRESHINDEXLIST/";
            this.state.fetchData.data.tab = nextProps.location.query.tab ? nextProps.location.query.tab : "all";
            actions.fetchData(this.state.fetchData);
        };
        this.setState(this.state);
    }
}

const mapStateToProps = (state) =>{
    return {
        state:state.IndexList,
        User:state.User
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(IndexList);