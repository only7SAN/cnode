const IndexList = (state = {
		isFetching:false,
		isRefreshing:false,
		data:[]
	},action) => {

		let newState;

		switch (action.type){
			case "APPENDINDEXLIST/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true
				})
				return newState;
			case "REFRESHINDEXLIST/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true,
					isRefreshing:true
				})
				return newState;
			case "APPENDINDEXLIST/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:state.data.concat(action.payload.data)
				})
				return newState;
			case "REFRESHINDEXLIST/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					isRefreshing:false,
					data:action.payload.data
				})
				return newState;
			case "APPENDINDEXLIST/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					errorData:action.payload.data
				})
				return newState;
			case "REFRESHINDEXLIST/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					isRefreshing:false,
					errorData:action.payload.data
				})
				return newState;
			default:
				return state;
		}
}

export default IndexList;