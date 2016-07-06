
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MFXUS0M1';

var cgLists = [];
var params = '';
var uPhone = '';
var pop_rep_pop = '';
var pop_no_chg = '';
var pop_saveComp = '';

function mainStart(){
	//params = navigation.parameters;
	settingLoading();
	$('.imgloading').show();
	
	uPhone = getAlopexCookie('uPhone');
	//setBoxList(params);
	setEventListner();
	//setDefault();
	
	var param = {
		"phoneNum" : uPhone, "gubun" : "20"
	};
	//showProgressBarMsg('고객 정보를 조회 중입니다.');
	httpSend("getAccInfo", param, function(cb){
		logf(cb);
		setBoxList(cb);
//		navigateGo('MACHP2M0',cb);
	}, function(errorCode, errorMessage) {
		if (errorCode == "9999") {
			loge('error :: 9999');
		} else {
			loge('error :: other');
		}
	});
}

function setBoxList(cbr){
	cb = cbr.list.bpCaList;

	$('.uPhone').html(viewPhoneNM(uPhone));
	var caList = '<p class="pb10">모바일 청구서를 신청하시면, 도시가스 앱에서 언제라도 1년간의 청구서를 조회하실 수 있으며,  푸시알림으로 청구서 발행 메시지도 받으실 수 있습니다.</p><p class="join_txt col_red"> 회원가입시 청구서는 도시가스 앱 또는 문자메시지(MMS)로만 확인이 가능합니다.(청구서는 납입자 번호별로 발행)</p>';

	for(var i=0;i<cb.length;i++){
		caList += '<div class="bill">'+
		'<input type="hidden" value="'+Number(cb[i].bp)+','+Number(cb[i].ca)+'"/>'+
		'<p><strong>납입자 번호</strong><span class="bold">'+Number(cb[i].ca)+'</span><span class="check"><label for="chkc'+i+'" class="af-checkbox-text"><input class="Checkbox" name="chkc0" value="'+Number(cb[i].ca)+'" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true" bdata="false"></label></span></p>'+
		'<p><strong>가입주소</strong><span class="txt">'+cb[i].addr+'&nbsp;</span></p>'+
		'</div>';
		cgLists[i] = {
			'bp' : Number(cb[i].bp),
			'ca' : Number(cb[i].ca),
			'sdType' : 22
		};
	}
	$('.box_CaList').html(caList);
	
	var params = '';
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
	}
	for(var i=0;i<params.list.bpCaList.length;i++){
		try{
			$('[value='+String(Number(params.list.bpCaList[i].ca))+']').attr('checked','checked');
			$('[value='+String(Number(params.list.bpCaList[i].ca))+']').attr('bdata','true');
		}catch(e){
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
//			console.log('######################################################################');
			loge(e);
		}
	}
	
	for(var i=0;i<$('[name=chkc0]').length;i++){
		logf(jQuery($('[name=chkc0]')[i]).context.attributes['bdata'].value);
	}
	
	completLoad();
	setDefault();
}

function setEventListner(){
	$('#pop_test_1').click(function(){
		$('#bill_n').css('display','none');
		$('#fbp_div').css('display','none');
	});
	
	$('#pop_test_n').click(function(){
		$('#bill_n').css('display','block');
		$('#fbp_div').css('display','block');
	});
		
	$('#pop_rep').click(function(){
		// 검증
		// 이전과 값이 동일
		if(chkChanged()){
			logf('go Change');
			if($('[name=chkc0]:checked').length > 0){
				logf('go join');
				pop_saveComp = $('.pop_saveComp').bPopup({
	    			opacity: 0.6,
	    			speed: 300, 
	    		});
			}else{
				logf('non selected');
				pop_rep_pop = $('.pop_rep').bPopup({
	    			opacity: 0.6,
	    			speed: 300, 
	    		});
			}
		}else{
			logf('no!!!!!!!!!!!!');
			pop_no_chg = $('.pop_noChg').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
		}
		
	});   	
	
	$('.okpop_rep_pop').click(function(){
		pop_rep_pop.close();
	});
	
	$('.okpop_no_chg').click(function(){
		pop_no_chg.close();
	});
	
	
	$('.beNO').click(function(){
		pop_saveComp.close();
	});
	$('.beOK').click(function(){
		logf($('[name=chkc0]:checked').length);
		
		var param = {'list' : 		[{'bpCaReqList' : []	}]  			};
		//for(var i=0;i<$('[name=chkc0]:checked').length;i++){
		for(var i=0;i<$('[name=chkc0]').length;i++){
			var s1 = $('[name=chkc0]')[i].parentNode.parentNode.parentNode.parentNode.children[0].value;
			var s2 = s1.split(',');
			var pn = uPhone;
			param.list[0].bpCaReqList[i] = {
					'bp' : s2[0],
					'ca' : s2[1],
					'phoneNum' : pn,
					'gubun' : ($('[name=chkc0]')[i].checked?"30":"40")
			};
		}

		logf('gclee MFXUS0M1' + param);
		
		httpSend("putAccInfo", param, function(cb2){
//			console.log(cb);
			// 앱을 처리
//			setAlopexCookie('MainBP','undefined');
//			setAlopexCookie('MainBPCA','undefined');
			//navigation.goHome();
			killAllSession();
			navigateGo('index');
		}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
				loge('error :: 9999 :: hsUsrCommit');
			} else {
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
				loge('error :: other :: hsUsrCommit');
			}
		});
	});
};

/**
 * 변경내역 있는지 검증
 * 변경내역 있는경우 true
 * @returns {Boolean}
 */
function chkChanged(){
	for(var i=0;i<$('[name=chkc0]').length;i++){
		if((jQuery($('[name=chkc0]')[i]).context.attributes['bdata'].value == 'true') != $('[name=chkc0]')[i].checked){
			return true;
		}
	}
	return false;
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');   	
    	
    };
});