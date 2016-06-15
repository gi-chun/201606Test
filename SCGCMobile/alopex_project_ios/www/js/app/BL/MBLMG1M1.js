//document.addEventListener('alopexready', mainStart);

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG1M1';
function mainStart(){	
//	settingLoading();
//	$('.imgloading').show();
	
	doPage();
}

function doPage(){
	var mainPage = JSON.parse(getAlopexSession('mainPage'));
//	logf(mainPage);
//	console.log(mainPage);
	console.log(mainPage.list.thsmonUsgQtyResult[0].DOC_HEADER_OPBEL);

	// TEST
//	$('#container').html("<object id='objHTML' data='http://m.skens.giro36524.com:8090/mobile.do?anno="+mainPage.list.thsmonUsgQtyResult[0].DOC_HEADER_OPBEL+" width='100%' height='100%' type='text/html' onload='doSetObj(this)'/>");
//	$('#container').html("<object id='objHTML' data='http://m.skens.giro36524.com:8090/mobile.do?anno=211007074828' width='100%' height='100%' type='text/html' onload='doSetObj(this)'/>");
	// 운영
	$('#container').html("<object id='objHTML' data='http://m.skens.giro36524.com:8090/mobile.do?anno="+mainPage.list.thsmonUsgQtyResult[0].DOC_HEADER_OPBEL+"' width='100%' height='100%' type='text/html' onload='doSetObj(this)'/>");
//	$('#container').html("<object id='objHTML' data='http://m.skens.giro36524.com/mobile.do?anno=211007074828' width='100%' height='100%' type='text/html' onload='doSetObj(this)'/>");
	
	setDefault();
}
//var ss2;
function doSetObj(ss){
	// 로고 지울지 말지 고민중
//	var ss2 = jQuery(ss);
//	var ss3 = jQuery(ss2.context.contentDocument.childNodes[1]);
//	ss3.find('#header').attr('style','display:none;');
}
$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});