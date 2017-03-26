const Messages = (state = {
		isFetching:true
	},action) => {

		let newState;

		switch (action.type){
			case "MESSAGES/BEGIN_FETCH_DATA":
				return state;
			case "MESSAGES/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "MESSAGES/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "COUNT/BEGIN_FETCH_DATA":
				return state;
			case "COUNT/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					countData:action.payload.data
				})
				return newState;
			case "COUNT/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					countData:action.payload.data
				})
				return newState;
			default:
				return state;	
		}
	
}

export default Messages;