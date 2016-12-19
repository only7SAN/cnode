import merged from 'obj-merged';

const target = 'https://cnodejs.org';
const Tool = {};

/**
*封装ajax请求
**/

Tool.ajax = function(mysettings){

	//默认设置i
	var settings = {
		url:window.location.pathname,
		type:'GET',
		async:true,
		data:{},
		dataType:'json',
		success:function(){},
		error:function(){}
	}

	var aData = [], //储存数据
		sData = '';	//拼接数据

	for(var attr in mysettings){
		settings[attr] = mysettings[attr];
	}
	for(var attr in settings.data){
		aData.push(attr + '=' + filter(settings.data[attr]));
	}
	sData = aData.join('&');
	settings.type = settings.type.toUpperCase();

	var xhr = new XMLHttpRequest();
	try{
		if(settings.type == 'GET'){
		sData = settings.url + '?' + sData;
		xhr.open(settings.type,sData + '&' + new Date().getTime(),settings.async);
		xhr.send();
		}else if (settings.type == 'POST'){
			xhr.open(settings.type,settings.url,settings.async);
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xhr.send(sData);
		}
	}catch(e){
		return httpEnd();
	}

	if(settings.async){
		xhr.addEventListener('readystatechange',httpEnd,false);
	}else{
		httpEnd();
	}

	function httpEnd(){
		if(xhr.readyState == 4){
			var responseHeader = xhr.getAllResponseHeaders();
			var response = xhr.responseText;

			if (/application\/json/.test(responseHeader) || settings.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if(xhr.status == 200){
            	settings.success(response,settings,xhr);
            }else{
            	settings.error(settings,xhr);
            }

		}
	}

	function filter(str){
		str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
	}

	xhr.end = function(){
		xhr.removeEventListener('readystatechange',httpEnd,false);
	}

	return xhr;
}

Tool.post = function(pathname,data,success,error){
	var mysettings ={
		url: target + pathname,
		type:'POST',
		data:data,
		success:success || function(){},
		error:error || function(){}
	}

	return Tool.ajax(mysettings);
};

Tool.get = function(pathname,data,success,error){
	var mysettings ={
		url: target + pathname,
		type:'GET',
		data:data,
		success:success || function(){},
		error:error || function(){}
	}

	return Tool.ajax(mysettings);
};

Tool.formatDate = function(str){
	var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
};

Tool.localItem = function(key,value){
	if(arguments.length == 1){
		return localStorage.getItem(key);
	}else if(arguments.length == 2){
		return localStorage.setItem(key,value);
	}
};

Tool.removeItem = function(key){
	if(key){
		return localStorage.removeItem(key);
	}else{
		return localStorage.removeItem();
	}
};

export { Tool, merged }