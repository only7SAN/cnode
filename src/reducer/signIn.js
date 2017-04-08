const SignIn = (state = {
			isPosting:false
		},action) => {

		let newState;

		switch (action.type){
			case "SIGNIN/BEGIN_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:true,
					data:"hello"
				})
				return state;
			case "SIGNIN/SUCCESS_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					data:action.payload
				})
				return newState;
			case "SIGNIN/FAIL_POST_DATA":
				newState = Object.assign({},state,{
					isPosting:false,
					errorData:action.payload
				})
				return newState;
			default:
				return state;	
		}
	
}

export default SignIn;