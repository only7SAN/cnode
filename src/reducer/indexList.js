const IndexList = (state = {
		isFetching:false,
		data:[]
	},action) => {

		let newState;

		switch (action.type){
			case "APEENDINDEXLIST/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true
				})
				return newState;
			case "REFRESHINDEXLIST/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true
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
					data:action.payload.data
				})
				return newState;
			case "APPENDINDEXLIST/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "REFRESHINDEXLIST/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			default:
				return state;	
		}
	
}

export default IndexList;