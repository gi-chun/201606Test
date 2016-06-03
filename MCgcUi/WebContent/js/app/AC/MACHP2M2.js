
document.addEventListener('alopexready', init);


var bcodeSave = ''; 
var bePGID = '';
function init(){

	setDefault();
	setEventListner();
	//이전페이지 체크해서 화면 표현
//	bePGID = getAlopexSession('bePGID');
	if(device.osName != 'iOS'){
		bePGID = getAlopexSession('bePGID');
	}else{
		bePGID = getAlopexCookie('bePGIDCookie');
	}
	if("MMNPG1M0" == bePGID){
		$('.doBack').html('돌아가기');
	}else{
		$('.doBack').html('다른 인증시도');
	}
	$('#box_01').show();
}

function setEventListner(){   	
	$('.doPic').click(function(){
		//jsniCaller.invoke("BarcodeReaderJSNI.showBarcodeReader","popBarcode");
		
		var option = {
	        "width" : 500,
	        "height" : 400,
	        "x" : window.event.x,
	        "y" : window.event.y
	    };
	    jsniCaller.invoke("BarcodeReaderJSNI.showBarcodeReader", JSON.stringify(option), "popBarcode");
		
	//	pop_error();
	});
	
	$('.doInput').click(function(){
		//TODO
		//팝업띄워서 입력 받음
		
		notiPop("바코드 직접입력","바코드 번호를 입력해 주세요.",false,true,null);
		
	});
	
	$('.doBack').click(function(){
//		$a.navigate('AC/MACHP2M0');
		try{
			if(bePGID == "MMNPG1M0"){
				navigateGo('MMNPG1M0');
			}else{
				navigateGo('MACHP2M0');
			}
		}catch(e){
			navigateGo('MACHP2M0');
		}
		
	});
	
	$('.doComp').click(function(){
		//$a.navigate('AC/MACHP1M1');
		var bcode = $('#setBarcode').val();
		bcodeSave = bcode;
		var param = {
						"vstelle" : bcode,
			    		"gubun" : "60"
					};
		logf(param);
		
    	httpSend("getAccInfo", param, function(cb){
    		// 회원가입
    		if(cb.list.bpCaList==undefined){
    			
    			var params = {};
    			params.from = '60';
    			params.retMsg = '[전자고지] 미존재 세대번호입니다.';
    			navigateGo('MACHP2M0',params);
    			return;
    		}
    		
			if(cb.list.bpCaList[0].retMsg.indexOf('대표번호 미존재')>-1){
				logf('S :: 인증완료 :: 등록하자! ');
    			setUsrCommit(cb.list.bpCaList);
    		}else{
    			cb.list.bpCaList[0].from = '60';
    			navigateGo('MACHP2M0',cb.list.bpCaList[0]);
    		}
    		//navigateGo('MMNPG0M0');
    	}, function(errorCode, errorMessage){
    		if (errorCode == "9999") {
    			loge('error :: 9999 :: barcode');
    		} else {
    			loge('error :: other :: barcode');
    		}
    	});
	});
	
	
};

function setUsrCommit(cb){
	var pn = getAlopexCookie('uPhone');
	var param = { "list" : [{ "bpCaReqList": []}] };
	var s = 0;
	for(var i=0;i<cb.length;i++){
		if(cb[i].retMsg.indexOf('대표번호 미존재')>-1){
			param.list[0].bpCaReqList[s] = {
				"bp" : cb[i].bp,
				"ca" : cb[i].ca,
	    		"phoneNum" : pn, 
	    		"vstelle" : bcodeSave,
	    		"gubun" : "30"
			};
			s++;
		}
	}

	if(param.list[0].bpCaReqList.length > 0){
    	httpSend("putAccInfo", param, function(cb){
    		// 인증
    		if(cb.list.bpCaList[0].retCd == 'S'){
    			console.log(cb);
	    		navigateGo('MACHP1M1',cb);
    		}else{
    			loge('error');
    			loge(cb);
    		}
    	}, function(errorCode, errorMessage){
    		if (errorCode == "9999") {
    			loge('error :: 9999 :: hsUsrCommit');
    		} else {
    			loge('error :: other :: hsUsrCommit');
    		}
    	});
	}else{
		logf('1::'+param.list[0].bpCaReqList.length);
	}
}

//var ss = '';
$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
    
    
});

function popBarcode(ss){
	logf('barcode ok');
	logf(JSON.parse(ss));
	
	var vstelle = ss.substr(0, ss.length-8); //세대번호 추출
	
	$('#setBarcode').val(vstelle);
	$('#box_01').hide();
	$('#box_02').show();
}