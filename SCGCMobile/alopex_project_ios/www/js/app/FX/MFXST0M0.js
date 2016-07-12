
document.addEventListener('alopexready', mainStart);
nowPGCode = 'MFXST0M0';
var ss = '';
var params = '';
var pn = '';
var be_id = "";
var bs_id = "";
function mainStart(){
	
	setEventListner();
	pn = getAlopexCookie('uPhone');
	doPage();
}

function setEventListner(){
//	$('#bill_cancle').bind('click', function(e) {
//		e.preventDefault();
//		bc_id = $('.bill_cancle').bPopup({
//			opacity: 0.6,
//			speed: 300,
//		});
//	});
//	$('#bill_apply').bind('click', function(e) {
//		e.preventDefault();
//		ba_id = $('.bill_apply').bPopup({
//			opacity: 0.6,
//			speed: 300, 
//		});
//	});
//	
//	$('#bill_send').bind('click', function(e) {
//		e.preventDefault();
//		bs_id = $('.bill_send').bPopup({
//			opacity: 0.6,
//			speed: 300, 
//		});
//	});
//	
//	$('.bcOK').click(function(){	bc_id.close();	});
//	$('.bcNO').click(function(){	bc_id.close();	});
//
//	$('.baOK').click(function(){	ba_id.close();	});
//	$('.baNO').click(function(){	ba_id.close();	});
//	
//	$('.bsOK').click(function(){	bs_id.close();	});
	
	$('#bill_end').click(function() {
		be_id = $('.bill_end').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	
	$('#bill_send').click(function() {
		bs_id = $('.bill_send').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	
	$('.beOK').click(function(){	
		//be_id.close();	
		showProgressBarMsg('저장중입니다.');
		
		//$('[type=hidden]')[0].value
		var param = { 'list' : 	[{'bpCaReqList' : [] }]	};
		
		var cgListsCookie = getAlopexCookie('cgLists');
		
		if(cgListsCookie == 'undefined'){
			var cgLists = [];
			logf(param);
			for(var i=0;i<$('[type=hidden]').length;i++){
				var s1 = $('[type=hidden]')[i].value;
    			var s2 = s1.split(',');
    			param.list[0].bpCaReqList[i] = {
						'bp' : s2[0],
						'ca' : s2[1],
						'phoneNum' : pn,
						'statusGp' : s2[2],
						'gubun' : '50'
				};
			}
			logf(param);
			for(var i=0;i<param.list[0].bpCaReqList.length;i++){
				cgLists[i] = {
						'bp' : Number(param.list[0].bpCaReqList[i].bp),
						'ca' : Number(param.list[0].bpCaReqList[i].ca),
						'sdType' : Number(param.list[0].bpCaReqList[i].statusGp)
				};
			}
			setAlopexCookie('cgLists',JSON.stringify(cgLists));
			//mokamoka10x
			logf('######################local');
		}else{
			logf(param);
			var cgLists = JSON.parse(cgListsCookie);
    		for(var i=0;i<$('[type=hidden]').length;i++){
    			logf('i::'+i);
    			var s1 = $('[type=hidden]')[i].value;
    			var s2 = s1.split(',');
    			param.list[0].bpCaReqList[i] = {
						'bp' : s2[0],
						'ca' : s2[1],
						'phoneNum' : pn,
						'statusGp' : s2[2],
						'gubun' : '50'
				};
    			for(var j=0;j<cgLists.length;j++){
    				if(cgLists[j].bp == Number(s2[0]) && cgLists[j].ca == Number(s2[1])){
    					cgLists[j].sdType = Number(s2[2]);
    					setAlopexCookie('cgLists',JSON.stringify(cgLists));
    					//mokamoka10x
    					break;
    				}
    			}
    		}
    		
    		logf('######################web');
    		
		}
		
		logf('gclee MFXST0M0' + param);
	
		httpSend("putAccInfo", param, function(cb){
			logf(cb);
    		//navigateGo('MMNPG0M0');
    		be_id.close();	
    		//goLogin();
    		hideProgressBar();
    		notiPop('변경 요청 완료','요청하신 내용으로 변경요청되었습니다.',false,false,null);
    	}, function(errorCode, errorMessage){
    		if (errorCode == "9999") {
    			//goLogin();
    			hideProgressBar();
    			be_id.close();	
    			logf('error :: 9999 :: hsUsrCommit');
    		} else {
    			//goLogin();
    			hideProgressBar();
    			be_id.close();	
    			logf('error :: other :: hsUsrCommit');
    		}
    	});
	});
	$('.beNO').click(function(){	
		be_id.close();	
	});
	$('.bsOK').click(function(){	
		var pushParam = { 
				'phoneNum':pn,
				'mrorderPushYn' : $('#selfUse').val(),
				'blPushYn' : $('#smartUse').val(),
				'noticePushYn' : $('#notiUse').val()
		};
		console.log(pushParam);
		httpSend("putPushSetupInfo", pushParam, function(pushcb){
			console.log(pushcb);
			bs_id.close();	
			notiPop('변경완료','Push 설정이 반영되었습니다.',false,false,null);
		}, function(errorCode, errorMessage){
			// error
			logf('######################push save error');
		});
	});
	$('.bsNO').click(function(){	
		bs_id.close();	
	});
};
var jq = '';
function doPage(){
	//
//	params = JSON.parse(getAlopexSession('loginSession'));
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
	}
	//console.log(params);
	$('.topLogoDiv').html(getTitleBp());
	
	var cgListsCookie = getAlopexCookie('cgLists');
	
	var bill_listStr = '';
	if(cgListsCookie == 'undefined'){		// 송달 쿠키 만료
		logf('######################web 2');
		for(var i=0;i<params.list.bpCaList.length;i++){
			var nowSd = Number(params.list.bpCaList[i].controlGp);
//			bill_listStr += '<div class="box'+(nowSd==21?' check':'')+'">'+
			bill_listStr += '<div class="box check">'+
        	' <input type="hidden" value="'+Number(params.list.bpCaList[i].bp)+','+Number(params.list.bpCaList[i].ca)+','+(nowSd==21?'21':'22')+'">'+
        	//' <input type="hidden" value="'+(nowSd==21?'21':'22')+'">'+
    		'			<dl>'+
    		'		<dt>납입자번호</dt>'+
    		'		<dd>'+Number(params.list.bpCaList[i].ca)+'</dd>'+
    		'	</dl>'+
    		'	<dl>'+
    		'		<dt>주소</dt>'+
    		'		<dd>'+params.list.bpCaList[i].addr+'</dd>'+
    		'	</dl>'+
    		'	<p class="btn"><button class="Button check_circle'+(nowSd==21?'':' off')+' appUse">'+(nowSd==21?'신청':'해지')+'</button></p>'+
    		'</div>';
		}
		$('.bill_listUSE').html(bill_listStr);
	}else{
		logf('######################local 2');
		var sdTypeList = JSON.parse(cgListsCookie);
    	for(var i=0;i<params.list.bpCaList.length;i++){
    		var nowSd = '';
    		if(sdTypeList[i].bp == Number(params.list.bpCaList[i].bp) && sdTypeList[i].ca == Number(params.list.bpCaList[i].ca)){
    			nowSd = sdTypeList[i].sdType;
    			logf(nowSd);
				//cgLists[i].sdType = 21;
				//break;
			}
//    		bill_listStr += '<div class="box'+(nowSd==21?' check':'')+'">'+
    		bill_listStr += '<div class="box check">'+
        	' <input type="hidden" value="'+Number(params.list.bpCaList[i].bp)+','+Number(params.list.bpCaList[i].ca)+','+(nowSd==21?'21':'22')+'">'+
        	//' <input type="hidden" value="'+(nowSd==21?'21':'22')+'">'+
    		'			<dl>'+
    		'		<dt>납입자번호</dt>'+
    		'		<dd>'+Number(params.list.bpCaList[i].ca)+'</dd>'+
    		'	</dl>'+
    		'	<dl>'+
    		'		<dt>주소</dt>'+
    		'		<dd>'+params.list.bpCaList[i].addr+'</dd>'+
    		'	</dl>'+
    		'	<p class="btn"><button class="Button check_circle'+(nowSd==21?'':' off')+' appUse">'+(nowSd==21?'신청':'해지')+'</button></p>'+
    		'</div>';
    	}
    	$('.bill_listUSE').html(bill_listStr);
	}
	
	// 푸시상태 확인
	var pushParam = { 'phoneNum':pn };
	httpSend("getPushSetupInfo", pushParam, function(pushcb){
		//
		console.log(pushcb);
		if(pushcb.blPushYn == 'Y'){
			jq = jQuery('.smartUse');
			$('#smartUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery('.smartUse');
			$('#smartUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
		
		if(pushcb.mrorderPushYn == 'Y'){
			jq = jQuery('.selfUse');
			$('#selfUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery('.selfUse');
			$('#selfUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
		
		if(pushcb.noticePushYn == 'Y'){
			jq = jQuery('.notiUse');
			$('#notiUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery('.notiUse');
			$('#notiUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
//		blPushYn 청구서
//		noticePushYn 공지
//		mrorderPushYn 자가검침
	}, function(errorCode, errorMessage){
		// error
		logf('######################push check error');
	});
	
	
	setDefault();
	$('.appUse').click(function(event){
		ss = event;
		var beVal = event.currentTarget.parentElement.parentElement.children[0].value;
		if(event.currentTarget.classList.length == 4){
			jq = jQuery(ss.currentTarget);
			event.currentTarget.parentElement.parentElement.children[0].value = beVal.substring(0,beVal.lastIndexOf(',')+1)+'21';
			jq.removeClass('off');
			jq.html('해지');
//			
//			var thisValue = event.currentTarget.parentElement.parentElement.children[0].value;
//    		//var tV = thisValue.split(',');
//    		console.log(thisValue);
		}else{
			//console.log('@@@@@@@@@@@@@@@@@@@');
			jq = jQuery(ss.currentTarget);
			event.currentTarget.parentElement.parentElement.children[0].value = beVal.substring(0,beVal.lastIndexOf(',')+1)+'22';
			jq.addClass('off');
			jq.html('신청');
//			
//			var thisValue = event.currentTarget.parentElement.parentElement.children[0].value;
//    		//var tV = thisValue.split(',');
//    		console.log(thisValue);
		}
		
	});
	
	$('.smartUse').click(function(event){
		ss = event;
		console.log(ss);
		console.log(event.currentTarget.classList.length);
		if($('#smartUse').val() != 'Y'){
	//	if(event.currentTarget.classList.length == 6){
			jq = jQuery(ss.currentTarget);
			$('#smartUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery(ss.currentTarget);
			$('#smartUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
	});
	
	$('.selfUse').click(function(event){
		ss = event;
		console.log(ss);
		console.log(event.currentTarget.classList.length);
		if($('#selfUse').val() != 'Y'){
//		if(event.currentTarget.classList.length == 6){
			jq = jQuery(ss.currentTarget);
			$('#selfUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery(ss.currentTarget);
			$('#selfUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
	});
	
	$('.notiUse').click(function(event){
		ss = event;
		console.log(ss);
		console.log(event.currentTarget.classList.length);
		if($('#notiUse').val() != 'Y'){
//		if(event.currentTarget.classList.length == 6){
			jq = jQuery(ss.currentTarget);
			$('#notiUse').val("Y");
			jq.removeClass('off');
			jq.html('해지');
		}else{
			jq = jQuery(ss.currentTarget);
			$('#notiUse').val("N");
			jq.addClass('off');
			jq.html('신청');
		}
	});
	
	
}

$a.page(function(){
	
    this.init = function(id,param){
    	logf('page on');
    	
    	
    };
    
//    var ba_id = "";
//    var bc_id = "";
//    var be_id = "";
//    var bs_id = "";
    
    
});