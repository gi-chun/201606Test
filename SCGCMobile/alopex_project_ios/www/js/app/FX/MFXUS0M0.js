
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MFXUS0M0';
var ss = '';
function mainStart(){
	settingLoading();
	$('.imgloading').show();
	setEventListner();
	
	$('.versionV').html("v " + application.appVersion + "." + application.contentVersion);
	
}

function setLayoutData(){
	
	//코원(B000)인 경우에만 제3자 동의영역 노출
	/*
	var notiBpData = getMainBP();
	var notiBp = notiBpData.substring(0,1)+"000";
	if(notiBp!='B000'){
		completLoad();
		setDefault();
		return;
	}else{
		$('#provide_info').show();
	}
	*/
	
	var mainBPCA = getMainBPCA();
	var mbc = JSON.parse(mainBPCA);

	param = {
			"bp":mbc.bp,
			"ca":mbc.ca
	};
	
	httpSend("getScgcPromotion", param, function(result){
		if(result.insuranceAt=='Y'){
			$('#agree_provide_info').attr('checked',true);
		}else if(result.insuranceAt=='N'){
			$('#refuse_provide_info').attr('checked',true);
		}else{
			// 아직 동의,거부 선택하지 않은 상태
		}
		
		completLoad();
		setDefault();
	}, function(errorCode, errorMessage){
		completLoad();
		setDefault();
		runMainGo(rtCB);
	});
	
}

var bsId = '';
var asaId = '';
var asId = '';

function setEventListner(){
	$('#bill_setMNG').click(function(){
		var paramf = {
				pageType : '1'
		};
		navigateBackToNaviGo('MFXST0M0',paramf);
	});
	$('#bill_setPUSH').click(function(){
		var paramf = {
				pageType : '2'
		};
		navigateBackToNaviGo('MFXST0M0',paramf);
	});
	$('.bpSelect').click(function(){
		bsId = $('.bill_set').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	$('.caSelect').click(function(){
		navigateGo('MFXUS0M1');
	});

	$('#app_secede').click(function() {
		asId = $('.app_secede').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	$('#app_check2').click(function() {
		navigateGo('MFXUS0C0');
	});
	
	$('#closeBtnExit').click(function(){
		asId.close();
	});
	
	$('#app_secede_ok').click(function(){
		if($('[name=chk1]:checked').length < 3){
			asaId = $('.app_secede_agree').bPopup({
    			opacity: 0.6,
    			speed: 300,
    		});
		}else{
    		//exitAppUser()
			notiPop('회원 탈퇴 확인','정말 탈퇴 하시겠습니까?',true,false,{
				list : [{
					name : '취소하기',
					id : 'pExitNo',
					type : '2'
				},{
					name : '탈퇴하기',
					id : 'pExitOk',
					type : ''
				}]
			});
			$('.pExitNo').click(function(){
				//asId.close();
				notiPopID.close();
			});
			$('.pExitOk').click(function(){
				//asId.close();
				exitAppUser();
			});
		}
	});
	
	$('.btnLastExit').click(function(){
		//$a.goHome();
		if(device.osName == 'Android'){
			navigation.exit();
		}else{
			killAllExitCookie();
			killAllSession();
			navigateGo('index');
		}
	});
	
	$('.closeBtnASA').click(function(){
		asaId.close();
	});
	
	$('#view_use').bind('click', function(e) {
		e.preventDefault();
		$('.view_use').bPopup({
			opacity: 0.6,
			speed: 300
		});
	});
	
	/*
	// 제3자 정보제공 동의 팝업
	$('#btn_provide_info_popup').click(function(){
		view_use_pop = $('.view_use_provide_info').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	
	// 제3자 제공 동의 영역, 거부 클릭할 경우 동의 클릭 해제
	$('#refuse_provide_info').click(function() {
        if($(this).is(':checked')) {
            $('#agree_provide_info').setChecked(false);
        }
        if($(this).is(':checked')==false && $('#agree_provide_info').is(':checked')==false){
        	$(this).setChecked(true);
        }else{
        	var mainBPCA = getMainBPCA();
        	var mbc = JSON.parse(mainBPCA);
        	param = {
        			"bp":mbc.bp,
        			"ca":mbc.ca,
        			"agree_provide_info_yn":"N"
        	};
        	
        	httpSend("putScgcPromotion", param, function(result){

        	}, function(errorCode, errorMessage){

        	});
        }
    });
	// 제3자 제공 동의 영역, 동의 클릭할 경우 거부 클릭 해제
	$('#agree_provide_info').click(function() {
        if($(this).is(':checked')) {
            $('#refuse_provide_info').setChecked(false);
        }
        if($(this).is(':checked')==false && $('#refuse_provide_info').is(':checked')==false){
        	$(this).setChecked(true);
        }else{
        	var mainBPCA = getMainBPCA();
        	var mbc = JSON.parse(mainBPCA);
        	param = {
        			"bp":mbc.bp,
        			"ca":mbc.ca,
        			"agree_provide_info_yn":"Y"
        	};
        	
        	httpSend("putScgcPromotion", param, function(result){

        	}, function(errorCode, errorMessage){

        	});
        }
    });
	*/
	
	doPage();
	
}

function exitAppUser(){
	var pn = getAlopexCookie('uPhone');
	var params = "";
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
	}
	var param = {'list' : [{'bpCaReqList':[]}]};
	for(var i=0;i<params.list.bpCaList.length;i++){
		param.list[0].bpCaReqList[i] = {
				"bp" : params.list.bpCaList[i].bp,
				"ca" : params.list.bpCaList[i].ca,
				"phoneNum" : pn, 
				"gubun" : "40"
    	};
	}
	showProgressBarMsg('처리중입니다.');
	logf('gclee MFXUS0M0' + param);
	
	httpSend("putAccInfo", param, function(cb){
		logf('cb',cb);
		hideProgressBar();
		// 계량기 여러대
		// 일치
		if(device.osName == 'Android'){
			alopexController.setCustomizedBack(function(){
				//alopexController.exit();
			});
		}
		$('.app_secede_ok').bPopup({
			modalClose: false,
			opacity: 0.6,
			speed: 300,
		});
		
		
	}, function(errorCode, errorMessage){
		hideProgressBar();
		if (errorCode == "9999") {
			loge('error :: 9999 :: out');
		} else {
			loge('error :: other :: out');
		}
	});
}

function doPage(){
	// 청구서 셋팅
	var params = '';
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
	}
	logf(params);
	var mainBPCA = getAlopexCookie('MainBPCA');
	logf(mainBPCA);
	var billSetListStr = '';
	if(mainBPCA == 'undefined'){
		billSetListStr = '';
		for(var i=0;i<params.list.bpCaList.length;i++){
			var s1 = getSelBP(String(params.list.bpCaList[i].regiogroup));
			var s2 = getAlopexCookie(s1);
			var bpData = JSON.parse(s2);
			billSetListStr += '<tr'+(i==0?' class="col_red"':'')+'>'+
			'	<td><label for="chk'+i+'" class="af-checkbox-text"><input class="Checkbox" name="chk0" value="'+params.list.bpCaList[i].regiogroup+','+params.list.bpCaList[i].bp+','+params.list.bpCaList[i].ca+'"'+(i==0?' checked="checked"':'')+' id="chk'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></label></td>'+
			'	<td>'+Number(params.list.bpCaList[i].ca)+'</td>'+
			'	<td>'+bpData.bpname+'</td>'+
			'</tr>';
		}
		
	}else{
		billSetListStr = '';
		var mbc = JSON.parse(mainBPCA);
		for(var i=0;i<params.list.bpCaList.length;i++){
			var s1 = getSelBP(String(params.list.bpCaList[i].regiogroup));
			logf(s1);
			var s2 = getAlopexCookie(s1);
			logf(s2);
			var bpData = JSON.parse(s2);
//			var mbp = getAlopexCookie('MainBP');
			//var isMainBp = false;
			logf(bpData);
			billSetListStr += '<tr'+(mbc.ca==params.list.bpCaList[i].ca?' class="col_red"':'')+'>'+
			'	<td><label for="chk'+i+'" class="af-checkbox-text"><input class="Checkbox" name="chk0" value="'+params.list.bpCaList[i].regiogroup+','+params.list.bpCaList[i].bp+','+params.list.bpCaList[i].ca+','+params.list.bpCaList[i].sernr+','+params.list.bpCaList[i].anlage+'"'+(mbc.ca==params.list.bpCaList[i].ca?' checked="checked"':'')+' id="chk'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></label></td>'+
			'	<td>'+Number(params.list.bpCaList[i].ca)+'</td>'+
			'	<td>'+bpData.bpname+'</td>'+
			'</tr>';
		}
	}
	
	$('.billSetList').html(billSetListStr);
	if(params.list.bpCaList.length > 1){
		$('.multiCaList').show();
	}
	openMultiCA();
	$('[name=chk0]').click(function(e){
		//console.log(e.currentTarget.id);
		$('[name=chk0]').setChecked(false);
		$('#'+e.currentTarget.id).setChecked(true);
		$('#'+e.currentTarget.id).parents('TBODY').children('TR').removeClass('col_red');
		$('#'+e.currentTarget.id).parents('TR').addClass('col_red');
	});
	
	
	$('.comMainBP').click(function(){
		//console.log('1111');
		var Str1 = $('[name=chk0]:checked')[0].value;
		var Str2 = Str1.split(',');
		var Str3 = {
				bp : Str2[1],
				ca : Str2[2],
				sernr : Str2[3],
				anlage : Str2[4],
				regiogroup : Str2[0]
		};
		setAlopexCookie('MainBP',Str2[0]);
		setAlopexCookie('MainBPCA',JSON.stringify(Str3));
		setAlopexSession('SessionBP',Str2[0]);
		setAlopexSession('SessionBPCA',JSON.stringify(Str3));
		bsId.close();
	});
	
	//console.log(params);
	
}

function openMultiCA(){
	var pn = getAlopexCookie('uPhone');
	
	//gclee login
	var param = {
		"phoneNum" : pn, "gubun" : "20"
	};
	//showProgressBarMsg('고객 정보를 조회 중입니다.');
	logf('gclee MFXUS0M0 ' + JSON.stringify(param));
	
	httpSend("getAccInfo", param, function(cb){
//		logf(cb);
//		setBoxList(cb);
		if(cb.list.bpCaList.length >1){
			$('.multiCaListJoin').show();
		}
		
		setLayoutData();
		
//			navigateGo('MACHP2M0',cb);
	}, function(errorCode, errorMessage) {
		if (errorCode == "9999") {
			loge('error :: 9999');
		} else {
			loge('error :: other');
		}
	});
}

//$(document).ready(function() {
//	
//	
////	$('#app_secede_agree').bind('click', function(e) {
////		e.preventDefault();
////		$('.app_secede_agree').bPopup({
////			opacity: 0.6,
////			speed: 300,
////		});
////	});
////	$('#app_secede_ok').bind('click', function(e) {
////		e.preventDefault();
////		$('.app_secede_ok').bPopup({
////			opacity: 0.6,
////			speed: 300,
////		});
////	});
//	
//
//});

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');	
    };
});