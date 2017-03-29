const TopicDetail = (state = {
		isFetching:false,
		isPosting:false
	},action) => {

		let newState;

		switch (action.type){
			case "TOPICDETAIL/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true
				})
				return newState;
			case "TOPICDETAIL/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "TOPICDETAIL/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					errorData:action.payload.data
				})
				return newState;

			//收藏reducer
			case "COLLECT/BEGIN_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:true
				})
				return newState;
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
					errorCollectData:action.payload
				})
				return newState;

			//取消收藏reducer
			case "DECOLLECT/BEGIN_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:true
				})
				return newState;
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
					errorDeCollectData:action.payload
				})
				return newState;

			//提交评论reducer
			case "REPLY/BEGIN_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:true
				})
				return newState;
			case "REPLY/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyData:action.payload
				})
				return newState;
			case "REPLY/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					errorReplyData:action.payload
				})
				return newState;

			//点赞reducer
			case "REPLYUP/BEGIN_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:true
				})
				return newState;
			case "REPLYUP/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					replyUpData:action.payload
				})
				return newState;
			case "REPLYUP/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					errorReplyUpData:action.payload
				})
				return newState;
			default:
				return state;	
		}
	
}

export default TopicDetail;