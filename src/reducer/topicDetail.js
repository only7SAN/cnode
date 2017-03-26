const TopicDetail = (state = {
		isFetching:false,
		data:{  
				author:{
						avatar_url : "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120",
						loginname : "alsotang"
						},
				id : 1,
		 		title : 'HelloWorld',
		 		is_collect:"false",
			   	visit_count : 1,
			    content : "HelloWorid",
			    replies : [],
			    reply_count : 1,
			    create_at : new Date(),
			    last_reply_at : new Date()
			}
	},action) => {

		let newState;

		switch (action.type){
			case "TOPICDETAIL/BEGIN_FETCH_DATA":
				return state;
			case "TOPICDETAIL/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "TOPICDETAIL/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;

			//收藏reducer
			case "COLLECT/BEGIN_POST_DATA":
				return state;
			case "COLLECT/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					collectData:action.payload,
					data:{
						...state.data,
						is_collect:true
					}
				})
				return newState;
			case "COLLECT/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					collectData:action.payload
				})
				return newState;

			//取消收藏reducer
			case "DECOLLECT/BEGIN_POST_DATA":
				return state;
			case "DECOLLECT/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					collectData:action.payload,
					data:{
						...state.data,
						is_collect:false
					}
				})
				return newState;
			case "DECOLLECT/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					collectData:action.payload
				})
				return newState;

			//提交评论reducer
			case "REPLY/BEGIN_POST_DATA":
				return state;
			case "REPLY/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyData:action.payload
				})
				return newState;
			case "REPLY/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyData:action.payload
				})
				return newState;

			//点赞reducer
			case "REPLYUP/BEGIN_POST_DATA":
				return state;
			case "REPLYUP/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyUpData:action.payload
				})
				return newState;
			case "REPLYUP/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyUpData:action.payload
				})
				return newState;
			default:
				return state;	
		}
	
}

export default TopicDetail;