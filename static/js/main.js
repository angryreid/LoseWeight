function clearStrage() {
    mdui.confirm('确认清除缓存登录信息', function() {
    	localStorage.removeItem('cool');
        mdui.alert('缓存信息已被清除,即将跳转至登录');
        setTimeout(function(){
        	window.location.href = "/cool/start";
        },1000);
    });   
}