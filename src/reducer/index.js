import {Tool,merged} from '../tool';

const User = (state = JSON.parse(Tool.localItem('User')),action) => {
	switch(action.type){
		case 'signin' :
			Tool.localItem('User',JSON.stringify(action.target));
			return action.target;
		case 'signout':
			Tool.removeItem('User');
			return null;
		default:
		    return state;
	}
}

const DB = (_ID = '',settings = {}) =>{

	const cb = {
		setDefault: () =>{
			var defaults = merged({
				path:'',
				loadMessage:'加载中',
				loadAnimate :true,
				data:'',
				scrollX:0,
				scrollY:0,
				mdrender:true
			},settings);

			return {defaults,path:{}}
		},

		setState: (state, target) => {
            state.path[target.path] = target;
            return merged(state);
        }
	}

	return (state = {}, action = {}) => {

        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.setDefault();
        }
    }
}

const IndexList = DB('IndexList', { page: 1, nextBtn: true, limit: 10, mdrender: false, data: [] }); //首页
const TopicDetail = DB('TopicDetail'); //主题详情
const Messages = DB('Messages'); //消息
const UserView = DB('User', { tabIndex: 0 }); //用户详情
export default { IndexList, TopicDetail, Messages, UserView, User }
