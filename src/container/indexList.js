import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action/actions';
import { Footer , DataLoad  , DataRefresh , DataNull ,IndexTitle , Nav , List } from '../component/indexList';


//页面首页主题展示
class IndexList extends Component {
    constructor(props) {
        super(props);
        let { actions } =this.props;
        let tab = this.props.location.query.tab ? this.props.query.tab  : 'all' ;

        this.state = ({fetchData:{
            component:"IndexList",
            prefix:"APPENDINDEXLIST/",
            url:"/api/v1/topics",
            data:{
                page:1,
                limit:15,
                tab:tab,
                mdrender:true
            }
        }})


        this.append = function() {
            this.state.fetchData.prefix = "APPENDINDEXLIST/";
            this.state.fetchData.data.page++;
            actions.fetchData(this.state.fetchData);
            this.setState(this.state);
          }

        this.refresh = function() {
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

        actions.fetchData(this.state.fetchData)
    }

    render(){  
        let { state } =this.props;
        let { data } = this.props.state;
        let list;
        
        if( data.length == 0){
            if(state.isFetching){
                list = <DataLoad />;
            }else{
                list = <DataNull />;
            }
        }else{
            if(state.isFetching && state.isRefreshing){
                list = <DataRefresh />;
            }else{
               list = <List list={data}  append = {this.append} refresh = { this.refresh } /> ; 
            }    
        }

        return (
            <div className="indexList"  style={{height: '350px'}}>
                <IndexTitle  />
                <Nav tab={this.tab} />
                { list }
                <Footer index='0' User = {this.props.User}/>
            </div>
            )
    }

    componentWillReceiveProps(nextProps) {
        let { actions , state } =this.props;


        this.state.fetchData.data.tab = nextProps.location.query.tab ? nextProps.location.query.tab : "all";
        if(nextProps.location.query.tab != this.props.location.query.tab){
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