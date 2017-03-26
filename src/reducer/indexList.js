const IndexList = (state = {
		isFetching:false
	},action) => {

		let newState;

		switch (action.type){
			case "INDEXLIST/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:true
				})
				return newState;
			case "INDEXLIST/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "INDEXLIST/FAIL_FETCH_DATA":
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