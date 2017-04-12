import {Tool} from "../tool";

let actions = {
	//开始获取数据
	fetchData:(settings) =>(dispatch,getState) =>{

		//如果正在获取或者刷新数据，结束
		if(getState()[settings.component].isFetching || getState()[settings.component].isRefreshing){
			return ;
		}

		let _settings = Object.assign({},{
			component:"",
			prefix:"DEFAULT/",
			url:"",
			data:{},
			success:() =>{},
			fail:() =>{}
		},settings)

		//通知开始获取数据
		dispatch(actions.beginFetchData(_settings.prefix));

		//发送ajax请求，获取数据
		Tool.get(_settings.url,_settings.data,(res) =>{
			dispatch(actions.successFetchData(_settings.prefix,res));
			_settings.success(res);
		},(error) =>{
			dispatch(actions.failFetchData(_settings.prefix,error));
			_settings.fail(error);
		})
	},

	//获取数据action
	beginFetchData:(prefix) =>({
			type:prefix + "BEGIN_FETCH_DATA"
		}),

	//获取成功action
	successFetchData:(prefix,res) =>({
			type:prefix + "SUCCESS_FETCH_DATA",
			payload:res
		}),

	//获取失败action
	failFetchData:(prefix,error) =>({
			type:prefix + "FAIL_FETCH_DATA",
			payload:error,
			error:true
		}),

	//开始post数据
	postData:(settings) => (dispatch,getState) =>{
		//如果正在post数据返回
		if(getState()[settings.component].isPosting){
			return ;
		}

		let _settings = Object.assign({},{
			component:"",
			prefix:"DEFAULT/",
			url:"",
			data:{},
			success:() =>{},
			fail:() =>{}
		},settings)

		//开始post数据
		dispatch(actions.beginPostData(_settings.prefix));

		Tool.post(_settings.url,_settings.data,(res) => {
			dispatch(actions.successPostData(_settings.prefix,res));
			_settings.success(res);
		},(error) =>{
			dispatch(actions.failPostData(_settings.prefix,error));
			_settings.fail(error);
		})
	},

	//post数据action
	beginPostData:(prefix) =>({
		type:prefix + "BEGIN_POST_DATA"
	}),

	//post数据成功action
	successPostData:(prefix,res) =>({
		type:prefix + "SUCCESS_POST_DATA",
		payload:res
	}),

	//post数据失败action
	failPostData:(prefix,error) =>({
		type:prefix + "FAIL_POST_DATA",
		payload:error,
		error:true
	}),

	//用户登录action
	userSignIn:(data) =>({
		type:"USER_SIGN_IN",
		payload:data
	}),

	//用户注销action
	userSignOut:() =>({
		type:"USER_SIGN_OUT"
	})
}

export default actions;