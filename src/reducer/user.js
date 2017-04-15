import {Tool} from '../tool';

const User = (state = JSON.parse(Tool.localItem('User')),action) =>{
	let newState;

	switch (action.type){
		case "USER_SIGN_IN":
			Tool.localItem('User',JSON.stringify(action.payload));
			newState = Object.assign({},state,
				JSON.parse( Tool.localItem('User')));
			return newState;
		case "USER_SIGN_OUT":
			Tool.removeItem('User');
			newState = null;
			return newState;
		default:
			return state;
	}
}

export default User;