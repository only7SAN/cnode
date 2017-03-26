import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import actions from '../action/actions';
import { Footer , IndexTitle , Nav , List } from '../component/indexList';

//页面首页主题展示
class IndexList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { actions , state } =this.props;

        let indexData = {
            page:1,
            type:"",
            limit:10,
            mdrender:true
        }

        actions.fetchData({
            prefix:"INDEXLIST/",
            url:"/api/v1/topics",
            data:indexData
        })
    }

    render(){
        let { data } = this.props.state;
        console.log(this.props);
        return (
            <div className="indexList">
                <IndexTitle />
                <Nav />
                { data ? <List list={data} /> : null }
                <Footer index='0' User = {this.props.User}/>
            </div>
            )
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