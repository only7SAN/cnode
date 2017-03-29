const UserView = (state = {
		isFetching:false
	},action) => {

		let newState;

		switch (action.type){
			case "USERVIEW/BEGIN_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false
				})
				return newState;
			case "USERVIEW/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "USERVIEW/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:action.payload.data
				})
				return newState;
			case "USERCOLLECTION/BEGIN_FETCH_DATA":
				return state;
			case "USERCOLLECTION/SUCCESS_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:{
						...state.data,
						collections:action.payload.data
					}
				})
				return newState;
			case "USERCOLLECTION/FAIL_FETCH_DATA":
				newState = Object.assign({},state,{
					isFetching:false,
					data:{
						...state.data,
						collections:action.payload.data
					}
				})
				return newState;
			default:
				return state;	
		}
	
}

export default UserView;