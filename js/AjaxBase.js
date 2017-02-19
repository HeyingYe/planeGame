



//创建XHR对象
function createXHR() {
	if (window.XMLHttpRequest) { //IE7+, FF, 谷歌...
		return new XMLHttpRequest();
	}
	//IE6-
	return new ActiveXObject("Microsoft.XMLHTTP");
}

//封装ajax
//传递的数据有 url  get 是否异步 返回数据成功后的回调
//形参为json对象
//{"method":"发送方式"，async"是否异步，url：请求地址,data:{请求数据}，callback：返回数据成功后的回调方法}
// var json = {"method":"POST","async":true,"url":"1_get.php","data":{"name":"jjk","age":18},callback:function(){
//     console.log(str);
// }}
function ajax(json){

    var xhr = createXHR();//局部变量
    //对默认值进行处理
    if(json.async){
        var async = json.async;
    }else{
        var async = true; //设置默认值
    }

    if (json.method) {
        var method = json.method;
    }else{
        var method = "GET";
    }

    if(json.url){
        var url = json.url
    }else{
        alert('缺少url 请检查');
        return;   //必须
    }
    //对默认值进行处理
    //处理请求参数

    if(json.data){
        var prpm =  prp(json.data);
    }

    //由于get 和post 的open 方法不一样
    if(method=="GET"){
       // url +="?"+prpm;

       if(prpm!=undefined){
            url +="?"+prpm;
       }
    } 
    xhr.open(method,url,async);
    //设置请求头必须在open方法调用以后
    if(method=="POST"){

        //将ajax请求模拟成form表单
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    if(async==true){
       // 异步请求
           xhr.onreadystatechange = function(){
                if (xhr.readyState==4&&xhr.status==200) {
                    if(json.callback){//对callback 进行判断  必须
                        json.callback(xhr.responseText);
                    }
                }
           }
           if(method=="POST"){
                xhr.send(prpm); //传递参数
           }else{
                xhr.send(null);
           }
        
    }else{
        //同步
        if(method=="POST"){
            xhr.send(prpm); //传递参数
       }else{
            xhr.send(null);
       }
       if(xhr.status==200) {
            if(json.callback){
                json.callback(xhr.responseText);
            }
       }
    }
    
}

function prp(data){
    var result = "";
    var arr = [];
        if(!data){
            return null
        }else{
            //name=jjk&age=18
            for(var  key in data){
                var str = key+'='+encodeURIComponent(data[key]);
                arr.push(str);
            }
        }
        result = arr.join('&');
        return result;
}


