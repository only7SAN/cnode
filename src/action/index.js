export default (_ID) =>{
	var action = {};
	var arr = [
		'signin',
		'signout',
		'setState'
	]

	for(let i=0;i<arr.length;i++){
		action[arr[i]] = (target) =>{
			return {_ID:_ID,target:target,type:arr[i]};
		}
	}

	return action;
}