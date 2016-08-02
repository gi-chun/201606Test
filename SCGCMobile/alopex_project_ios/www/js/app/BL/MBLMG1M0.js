//document.addEventListener('alopexready', mainStart);

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG1M0';
function mainStart(){
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();
	
	doPage();
}

var auto_bill_id = "";
var ss = '';
var currentCa = '';
var paramBpCa = {'list' : [{'bpCaList' : [] }]};

var CDATE = '';

function setEventListner(){
	
	
	
	
//	$('.btn_account').click(function(){
//	console.log('편의점 수납');
//	// 오픈연기  16일 or 21일
//	// 구미 E, 전남 G, 전북 K
//	var mbp = getMainBP();
//	if(mbp.indexOf('E') == 0 || mbp.indexOf('G') == 0 || mbp.indexOf('K') == 0){
//		navigateGo('MBLMG1M1');
//	}else{
//		$('.pop_prepare').bPopup({
//			opacity: 0.6,
//			speed: 300,
//		});
//	}
//});
	
	$('.btn_account_regist').click(function(){
		auto_bill_id = $('.pop_account_regist').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	$('.btn_account_info').click(function(){
		$('.pop_account').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	
	
	$('.phoneCancle').click(function(){
		auto_bill_id.close();
	});
	
	$('.phoneCall').click(function(){
		myCallCenter();
	});
	
	$('.btn_account_confirm').click(function(){
		$('.pop_bank').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	//gclee card
	$('.btn_account_card').click(function(){
//		navigateGo('MBLMG2M0');
		navigateGo('MBLMG3M0');
	});
	
};

function doPage(){
	$('.topLogoDiv').html(getTitleBp());
//	var mainPage = JSON.parse(getAlopexSession('mainPage'));
	var loginSession = "";
	if(device.osName != 'iOS'){
		loginSession = JSON.parse(getAlopexSession('loginSession'));
	}else{
		loginSession = JSON.parse(getAlopexCookie('loginCookie'));
		//gclee login
//		loginSession = JSON.parse(getAlopexSession('loginSession'));
	}
	logf(loginSession);
	
	
//	paramBpCa.list = [{'bpCaList' : []}];
//	
	for(var i=0;i<loginSession.list.bpCaList.length;i++){
		paramBpCa.list[0].bpCaList[i] = {
			'bp' : String(Number(loginSession.list.bpCaList[i].bp)),
			'ca' : String(Number(loginSession.list.bpCaList[i].ca)),
			'regiogroup' : loginSession.list.bpCaList[i].regiogroup,
			'sernr' : loginSession.list.bpCaList[i].sernr,
			'anlage' : loginSession.list.bpCaList[i].anlage
			
		};
	}
	var chkBPCA = getMainBPCA();
	if(chkBPCA == 'undefined'){
		currentCa = Number(loginSession.list.bpCaList[0].ca);
	}else{
		var useBPCA = JSON.parse(chkBPCA);
		currentCa = Number(useBPCA.ca);
	}
	
	showPayList();
}

var pinId = '';
function showPayList(){
	httpSend("getBpCaPayInfo", paramBpCa, function(cbq){
		logf('jysjys',cbq);

		var list_numStr = '';
		var list_numCount = 0;
		var param = '';
		for(var i=0;i<cbq.list.bpCaList.length;i++){
//			if(cbq.list.bpCaList[i].doc_header_opbel != ''){
				list_numStr += '<li class="'+(currentCa == Number(cbq.list.bpCaList[i].ca)?'key_':'')+'num goPayInfo"><input type="hidden" value="'+cbq.list.bpCaList[i].regiogroup+','+Number(cbq.list.bpCaList[i].bp)+','+Number(cbq.list.bpCaList[i].ca)+','+cbq.list.bpCaList[i].sernr+','+cbq.list.bpCaList[i].anlage+','+Number(cbq.list.bpCaList[i].doc_header_opbel)+'"><a href="javascript:void(0);">'+Number(cbq.list.bpCaList[i].ca)+'</a></li>';
				list_numCount++;
//			}
		}
		
		for(var i=0;i<cbq.list.bpCaList.length;i++){
			//console.log('12121212121212121212::'+currentCa);
			if(Number(cbq.list.bpCaList[i].ca) == currentCa){
				//console.log('12121212');
				//box_type1
				var box_type1Str = '<h3>납입자번호</h3>'+
				'<span class="col_red">'+Number(cbq.list.bpCaList[i].ca)+'</span>';
				if(list_numCount > 1) box_type1Str += '<p class="small btn_input_num"><button id="button_input_num">납입자번호 선택하기</button></p>';
				$('.box_type1').html(box_type1Str);
				
				param = {
						'bp' : cbq.list.bpCaList[i].bp,
						'ca' : cbq.list.bpCaList[i].ca,
						'doc_header_opbel' : cbq.list.bpCaList[i].doc_header_opbel
				};
			}
		}
		$('.list_num').html(list_numStr);
		
		$('#button_input_num').click(function(){
			pinId = $('.pop_input_num').bPopup({
				opacity: 0.6,
				speed: 300,
			});
		});
		
		$('.goPayInfo').click(function(event){
			
			$('.tacBox1').hide();
			$('.tacBox2').hide();
			
			var s1 = jQuery(event.currentTarget);
//			var s2 = s1.children('input')[0].value;
//			var s3 = s2.split(',');
			
			var Str1 = s1.children('input')[0].value;
			var Str2 = Str1.split(',');
			var Str3 = {
					bp : Str2[1],
					ca : Str2[2],
					sernr : Str2[3],
					anlage : Str2[4],
					regiogroup : Str2[0]
			};

			setAlopexSession('SessionBP',Str2[0]);
			setAlopexSession('SessionBPCA',JSON.stringify(Str3));
			putGlobalPreference('selectedBp', Str2[0]);
			putGlobalPreference('selectedBpCa', JSON.stringify(Str3));
			
			currentCa = Number(Str2[2]);
			showPayList();
			pinId.close();
		});
		
		logf(param.doc_header_opbel);
		if(param.doc_header_opbel == undefined){
			
			$('.box_form_none').show();
			$('.formBox1').hide();
			$('.formBox2').hide();
		}else{
			showPayInfo(param);
		}
		
		
    	
		completLoad();
		setDefault();
    	
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 99991 :: main');
		} else {
			loge('error :: other1 :: main'+errorMessage);
		}
	});
}

function showPayInfo(pr){
	//if(currentCa == ''){
	
	//}
	logf(pr);
	httpSend("getPayInfo", pr, function(cbq){
		logf(cbq);
		if(cbq.list.billDetailResult == undefined){
			$('.box_form_none').show();
			$('.formBox1').hide();
			$('.formBox2').hide();
		}else{
			$('.box_form_none').hide();
			$('.formBox1').show();
			$('.formBox2').show();
			var cgInfoStr = '';
			cgInfoStr += '<li><strong>당월사용량</strong> <span class="floatR">'+chgNumberToMoney(cbq.list.billDetailResult[0].ABRMENGE.substring(0,cbq.list.billDetailResult[0].ABRMENGE.indexOf('.')))+' MJ</span></li>';
			for(var i=1;i<8;i++){
				if(eval('cbq.list.billDetailResult[0].ZBTRANS_0'+i) != ''){
					var s1 = eval('cbq.list.billDetailResult[0].ZBTRANS_0'+i).split(' ');
					cgInfoStr += '<li><strong>'+s1[0]+'</strong> <span class="floatR">'+s1[s1.length-1]+'원</span></li>';
				}
			}
			var s2 = cbq.list.billDetailResult[0].ZBTRANS_99.split(' ');
			cgInfoStr += '<li class="total"><strong>'+s2[0]+'</strong> <span class="floatR">'+s2[s2.length-1]+'원</span></li>';

			$('.cgInfo').html(cgInfoStr);
			
			//gclee card - important
			cbq.list.billDetailResult[0].BANKA = '';
			//gclee
			// 납부방식 화면 헨들링
			if(cbq.list.billDetailResult[0].BANKA == ''){
				//일반
				//ZCATT01
				//ZCATP01
				var tab5_3Str = '';
	    		for(var i=1;i<9;i++){
	    			if(eval('cbq.list.billDetailResult[0].ZCATT'+'0'+i) != ''){
	    				tab5_3Str += '<li class="bank">';
	    				tab5_3Str += getBankName(eval('cbq.list.billDetailResult[0].ZCATT'+'0'+i));
	    				tab5_3Str += '<span class="floatR">'+eval('cbq.list.billDetailResult[0].ZCATP'+'0'+i)+'</span></li>';
	    			}
	    		}
	    		tab5_3Str += '<li class="box_blue"><strong>예금주</strong> <span class="floatR">'+cbq.list.billDetailResult[0].ZCOUNT_NAME+'</span></li>';
	    		$('.bankList').html(tab5_3Str);
				$('.tacBox1').show();
			}else{
				//자동이체
				$('.tacBox2').show();
				var account_listStr = '<li><strong>예금주 명</strong> <span class="floatR">'+cbq.list.billDetailResult[0].BANKOUT_KOINH+'</span></li>'+
					'<li><strong>금융기관</strong> <span class="floatR">'+cbq.list.billDetailResult[0].BANKA+'</span></li>'+
					'<li><strong>계좌번호</strong> <span class="floatR">'+cbq.list.billDetailResult[0].BANKOUT_BANKN+'</span></li>'+
					'<li><strong>이체일자</strong> <span class="floatR">'+toDateAddDot(cbq.list.billDetailResult[0].FAEDN)+'</span></li>';
				$('.account_list').html(account_listStr);
			}
			
			$('.form_price').html(s2[s2.length-1]+'원');
			$('.form_closed2').html(toDateAddDot(cbq.list.billDetailResult[0].FAEDN)+'까지');
			
			
			$('.btn_account').click(function(){
				console.log('편의점 수납');
				
				$('.pop_prepare').bPopup({
					opacity: 0.6,
					speed: 300,
				});
				
//				// 오픈연기  16일 or 21일
//				// 구미 E, 전남 G, 전북 K
//				var mbp = getMainBP();
//				if(isCBNStart(cbq.list.billDetailResult[0].CDATE)){
//					if(mbp.indexOf('E') == 0 || mbp.indexOf('G') == 0 || mbp.indexOf('K') == 0){
//						navigateGo('MBLMG1M1');
//					}else{
//						$('.pop_prepare').bPopup({
//							opacity: 0.6,
//							speed: 300,
//						});
//					}
//				}else{
//					$('.pop_prepare').bPopup({
//						opacity: 0.6,
//						speed: 300,
//					});
//				}
			});
			
			
		}
		
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main'+errorMessage);
		}
	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	
    };
       
    
});