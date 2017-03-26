const TopicDetail = (state = {
		isPosting : false
	},action) => {

		let newState;

		switch (action.type){
			case "TOPICNEW/BEGIN_POST_DATA":
				return state;
			case "TOPICNEW/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					data:action.payload
				})
				return newState;
			case "TOPICNEW/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					data:action.payload
				})
				return newState;
			default:
				return state;	
		}
	
}

export default TopicDetail;