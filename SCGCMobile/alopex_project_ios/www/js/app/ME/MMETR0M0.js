
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MMETR0M0';
var params = {};
var meParam = '';
var loginSessionInfo;
function mainStart(){
	//params = navigation.parameters;
	//params = param;

	if(device.osName != 'iOS'){
		loginSessionInfo = JSON.parse(getAlopexSession('loginSession'));
	}else{
		loginSessionInfo = JSON.parse(getAlopexCookie('loginCookie'));
	}
	
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();
	
	doPage();
}

var popup_u_id = "";
var popup_l_id = "";
function setEventListner(){
	$('#btn_last_save').click(function(){
		var bc = Number(params.lsmthMesureValue);
		var nc = Number($('#reg_1').html()+$('#reg_2').html()+$('#reg_3').html()+$('#reg_4').html()+$('#reg_5').html());
		//console.log(bc);
		if(nc>=bc){
			//console.log(true);
			popup_u_id = $('.popup_u').bPopup({
    			opacity: 0.6,
    			speed: 300,
    		});
		}else{
			if(params.actualCustomErmrtype=="03" || params.waReplFlag=='Y'){
				//전월 추정검침 했다면, 계량기 교체가 발생 했다면 입력 가능하도록 popup_lw 팝업 출력
				popup_l_id = $('.popup_lw').bPopup({
	    			opacity: 0.6,
	    			speed: 300,
	    		});
			}else{
				//전월 추정검침 아니었다면 입력 불가
				popup_l_id = $('.popup_l').bPopup({
	    			opacity: 0.6,
	    			speed: 300,
	    		});
			}
		}
		//$a.navigate('ME/MMETR0M1');
	});
	
	var resetButtonClickListener = function(){
		popup_l_id.close();
		$('#btn_reset').click();
	};
	$('#btn_reset_l').click(resetButtonClickListener);
	$('#btn_reset_lw').click(resetButtonClickListener);
	
	$('#btn_reset_u').click(function(){
		popup_u_id.close();
		$('#btn_reset').click();
	});
	
	saveButtonClickListener = function(){
		var nc = Number($('#reg_1').html()+$('#reg_2').html()+$('#reg_3').html()+$('#reg_4').html()+$('#reg_5').html());
		logf('nc::',nc);
//		var rt = {
//				'chk' : nc
//		};
		//$a.navigate('ME/MMETR0M1', rt);

		var mainParam = '';
		if(device.osName != 'iOS'){
			mainParam = getAlopexSession('mainParam');
		}else{
			mainParam = getAlopexCookie('mainParamCookie');
		}
		mainParam = JSON.parse(mainParam);
		
		var cb = meParam;
		param = {	
				'bp' : cb.list.userInfoResult[0].BPNO,
				'ca' : cb.list.userInfoResult[0].CANO,
				'sernr' : cb.gasMrnrNo,
				'anlage' : mainParam.anlage,
				'v_ldo' : mainParam.regiogroup,
				'adatsoll1' : cb.adatsoll1,
				'cust_readingresult' : String(nc),
				"name_last": cb.list.userInfoResult[0].BUS_PART_NAME
		};
		
		
		// 입력
		// 테스트를 위해 잠시 차단 2015-05-30
		
		httpSend("putMrSelfOrderResult", param, function(cbq){
			logf(cbq);
			cbq.chk = nc;
			navigateGo('MMETR0M1',cbq);
		}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main'+errorMessage);
    		}
		});
	};
	$('#btn_save_u').click(saveButtonClickListener);
	$('#btn_save_lw').click(saveButtonClickListener);
	
	$('.plus').click(function(tr){
		//ss = tr;
		var bc = Number(tr.currentTarget.nextElementSibling.innerText)+1;
		if(bc > 9){
			bc = 0;
			$('#'+tr.currentTarget.nextElementSibling.id).html(bc);
		}else{
			$('#'+tr.currentTarget.nextElementSibling.id).html(bc);
		}
	});
	
	$('.minus').click(function(tr){
		//ss = tr;
		var bc = Number(tr.currentTarget.previousElementSibling.innerText)-1;
		if(bc < 0){
			bc = 9;
			$('#'+tr.currentTarget.previousElementSibling.id).html(bc);
		}else{
			$('#'+tr.currentTarget.previousElementSibling.id).html(bc);
		}
	});
	
	$('#btn_reset').click(function(){
//		$('#reg_1').html(0);
//		$('#reg_2').html(2);
//		$('#reg_3').html(8);
//		$('#reg_4').html(5);
//		$('#reg_5').html(3);
		setJICHIM(params.lsmthMesureValue);
	});
	
};

function doPage(){
	
	$('.topLogoDiv').html(getTitleBpPush());
	
	var mainParam = '';
	if(device.osName != 'iOS'){
		mainParam = getAlopexSession('mainParam');
	}else{
		mainParam = getAlopexCookie('mainParamCookie');
	}
	var param = JSON.parse(mainParam);
	// bp,ca 리스트 체크 1건인경우 실행
	//$('.plusBTN').hide();
	
	// 한건이 아닌경우 셋팅
	
	
	
//	param.list = [];
//	param.list[0] = {'bpCaList' : [] };
//	param.list[0].bpCaList[0] = JSON.parse(mainParam);
	logf('mainParam::'+mainParam);
	setDefault();
	httpSend("getMrSelfOrderInfo", param, pageSetting, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function pageSetting(cb){
	setAlopexSession('meParam',JSON.stringify(cb));
	meParam = cb;
	var meNo = cb.list.userInfoResult[0].CANO;
	
	logf(cb);
	params.lsmthMesureValue = cb.lsmthMesureValue;
	params.actualCustomErmrtype = cb.actualCustomErmrtype;
	params.waReplFlag = cb.waReplFlag;
	
	var infoStr = '';
	// 고객정보가 없으면 표시하지 않음
	if(cb.list.userInfoResult != null) {
		
		// 다수 ca 고객의 경우, 선택된 ca에 따른 주소 표기
		var meAddr = loginSessionInfo.list.bpCaList[0].addr;
		for(var i=0; i < loginSessionInfo.list.bpCaList.length; i++){
			if(loginSessionInfo.list.bpCaList[i].ca==meNo){
				meAddr = loginSessionInfo.list.bpCaList[i].addr;
			}
		}
		// --
		
		infoStr += '<ul>';
		infoStr += '	<li><strong>고객명</strong>'+ascUserNM(cb.list.userInfoResult[0].BUS_PART_NAME)+'</li>';
//		infoStr += '	<li><strong>고객주소</strong>'+cb.list.userInfoResult[0].CONT_ADDRESS+'</li>';
		infoStr += '	<li><strong>고객주소</strong>'+meAddr+'</li>';
		infoStr += '</ul>';
	}
	
	
	if(!isChkEnd(cb.e_adatsoll1)){
		infoStr += '<ul>'+
		'	<li><strong>등록기간</strong> '+getMEDate(cb)+'</li>'+
		'	<li><strong>계량기번호</strong> '+cb.gasMrnrNo+'</li>'+
		'	<li><strong>전월지침</strong> '+cb.lsmthMesureValue+'㎥</li>'+
		'</ul>';
	}
	if(!isChkEnd(cb.e_adatsoll1)){
		infoStr += '<ul>'+
		'	<li><strong>당월지침</strong> <span class="floatR">검정색 테두리 안 흰색 숫자 입력</span></li>'+
		'	<li class="none">'+
		'		<p class="clear pt10 pb10"><img src="../../images/sample_thismonth.png" alt="당월지침 샘플 화면" style="width:100%" /></p>';
	}
	
	if(!isChkEnd(cb.e_adatsoll1)){
		infoStr += '		<p class="tac small btn_save"><button id="btn_save" class="Button red big">당월지침 입력</button></p>';
	}
	infoStr += '	</li>'+
	'</ul>';
	$('.infoBox').html(infoStr);
	setJICHIM(params.lsmthMesureValue);
	addBPCAList();
}

function getMEDate(cb){
	var sdt = cb.s_adatsoll1;
	var edt = cb.e_adatsoll1;
	var rt = toMEDate(sdt,edt)+'까지 <span class="d-day">'+getDDay(cb.e_adatsoll1)+'</span>';
	
	return rt;
}

function setJICHIM(lmv){
	logf('okokoko',lmv);
	var lmvStr = '';
	if(lmv.length < 5){
		lmvStr = '';
		for(var i=0;i<(5-lmv.length);i++){
			lmvStr += '0';
			if(i==((5-lmv.length)-1)){
				lmvStr += lmv;
			}
		}
		//return lmvStr;
		setJICHIMNo(lmvStr);
	}else{
		lmvStr = lmv;
		setJICHIMNo(lmvStr);
	}
	
}

function setJICHIMNo(lmv){
	logf('lmv',lmv);
	$('#reg_1').html(Number(lmv.substring(0,1)));
	$('#reg_2').html(Number(lmv.substring(1,2)));
	$('#reg_3').html(Number(lmv.substring(2,3)));
	$('#reg_4').html(Number(lmv.substring(3,4)));
	$('#reg_5').html(Number(lmv.substring(4,5)));
}

function addBPCAList(){
	var mainParam = '';
	if(device.osName != 'iOS'){
		mainParam = getAlopexSession('mainParam');
	}else{
		mainParam = getAlopexCookie('mainParamCookie');
	}
 	var param = JSON.parse(mainParam);
//	console.log('444',param);
	var pr = {'list' : [{'bpCaList' : [param]}]};
	logf(pr);
	logf(JSON.stringify(pr));
//	console.log('2222');
	var endME = getAlopexSession('endME');
	httpSend("getMrSelfOrderBpCaInfo", pr, function(cb){
//		logf('3333');
//		console.log('2222',cb);
		var popListStr = '';
		$.each(cb.list.bpCaMeResultList, function(i,el){
			logf(el);
			popListStr += '<li class="key_num"><a href="javascript:void(0);">'+Number(el.ca)+'</a><span class="input '+(el.meResult?'input_date':'input_no')+'">'+el.meResult+'</span></li>';
			if(i==0)	{
				var popStr = '<h3>납입자번호</h3>'+
				'<span class="col_red">'+Number(el.ca)+'</span>'+
				'<span class="input input_date">'+(el.meResult==""?(endME=='false'?'미입력':'입력완료'):el.meResult)+'</span>';
				if(cb.list.bpCaMeResultList.length > 1) popStr += '<p class="small btn_input_num plusBTN"><button id="button_input_num">납입자번호 선택하기</button></p>';
				$('.box_type1').html(popStr);
			}
    	});
		$('.popList').html(popListStr);
		completLoad();
	}, function(errorCode, errorMessage){
		logf('3333444');
		if (errorCode == "9999") {
			loge('error :: 9999 :: addBPCAList');
		} else {
			loge('error :: other :: addBPCAList');
		}
	});
}

$a.page(function(){
	
    this.init = function(id,param){
    	logf('page on');
    	
    };
    
});



(function($) {
    $(function() {
      var $p1 = $('.pop_input_num'),
          $p2 = $('.pop_input_save');
          // i = 0;

        $('body').on('click', '.small', function(e) {
            e.preventDefault();
            var popup = $(this).hasClass('btn_input_num','btn_save') ? $p1 : $p2,
//                content = $('.content'),
                self = $(this);
            popup.bPopup(self.data('bpopup') || {});
        });
    });
})(jQuery);